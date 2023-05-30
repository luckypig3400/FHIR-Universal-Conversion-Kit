const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-PleuralInvasion',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-weight-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-WeightExample.json.html
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-WeightExample-1.json.html

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Pleural-invasion"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">目前為空值，可根據使用需求自行產生這筆資料的摘要資訊並填入此欄位</div>"
    },
    status: "final", //registered | preliminary | final | amended +
    category: {
      coding: [
        {
          system: "http://hl7.org/fhir/R4/codesystem-observation-category.html",
          code: "laboratory",
          display: "Laboratory"
        }
      ]
    },
    code: {
      coding: [
        {
          system: "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-MicroscopicFinding",
          code: "Pleural-invasion",
          display: "Pleural invasion"
        }
      ]
    },
    subject: {
      reference: "Patient/MitwPatient"
    }
  }
}

// Global Preprocessor Hook
// Data will run the following function before we iterate each fields
module.exports.beforeProcess = (data) => {
  checkLUNG();
  // 在開始轉換前檢查TWCR的package是否有更新

  // *依據申報內容不同有可能為 valueCodeableConcept 或 valueQuantity
  // 經過beforeProcess的處理後再決定target

  // beforeProcess超級強大的! 感覺真的什麼資料都可以處理!!!
  // console.log(data);
  if (data.Pleuralinvasion == "present" | "+" | "(+)") {
    data.Pleuralinvasion = "1";
  }
  else if (data.Pleuralinvasion == "absent" | "-" | "(-)") {
    data.Pleuralinvasion = "0";
  }
  else if (data.Pleuralinvasion != null) {
    data.Pleuralinvasion = "8"
  }
  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-PleuralInvasion-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Pleuralinvasion',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Invasion",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);
      valueCodeableConcept.coding[0].code = data;
      let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", data);
      valueCodeableConcept.coding[0].display = displayValue;

      return valueCodeableConcept;
    }
  }
]