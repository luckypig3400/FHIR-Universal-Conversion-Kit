const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-Height',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-height-profile.html			
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-HeightExample.json.html			
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-HeightExample-1.json.html			

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/height-profile"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">目前為空值，可根據使用需求自行產生這筆資料的摘要資訊並填入此欄位</div>"
    },
    status: "registered", //registered | preliminary | final | amended +
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "3137-7",
          display: "Body height Measured"
        }
      ]
    }
  }
}

// Global Preprocessor Hook
// Data will run the following function before we iterate each fields
module.exports.beforeProcess = (data) => {
  // HEIGHT *依據申報內容不同有可能為 valueCodeableConcept 或 valueQuantity
  // 經過beforeProcess的處理後再決定target
  data.HEIGHT_copy = String(data.HEIGHT);

  // beforeProcess超級強大的! 感覺真的什麼資料都可以處理!!!
  // console.log(data);
  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `TWCR-Height-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 身高	HEIGHT	valueCodeableConcept / valueQuantity
    // *依據申報內容不同有可能為 valueCodeableConcept 或 valueQuantity
    source: 'HEIGHT',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      // https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-HeightExample-1.json.html
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/height-codesystem",
            "code" : "999",
            "display" : "病歷未記載或不詳"
          }
        ]
      }
      `);

      if (parseInt(String(data)) <= 600) {
        return null;
      }
      else
        return valueCodeableConcept;
    }
  },
  {
    // 身高	HEIGHT	valueCodeableConcept / valueQuantity
    // *依據申報內容不同有可能為 valueCodeableConcept 或 valueQuantity
    source: 'HEIGHT_copy',
    target: 'Observation.valueQuantity',
    beforeConvert: (data) => {
      // https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-HeightExample.json.html
      let valueQuantity = JSON.parse(`
      {
        "value" : 160,
        "unit" : "cm",
        "system" : "http://unitsofmeasure.org",
        "code" : "cm"
      }
      `);

      if (parseInt(String(data)) <= 600) {
        valueQuantity.value = parseInt(String(data));
        return valueQuantity;
      }
      else
        return null;
    }
  }
]