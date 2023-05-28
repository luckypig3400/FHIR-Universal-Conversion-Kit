const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-SizeOfInvasionFocus',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Size-of-invasion-focus"
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
          system: "http://loinc.org",
          code: "33759-2",
          display: "Deepest extent of invasion [Type] in Specimen"
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
  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-SizeOfInvasionFocus-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Size of invasive focus',
    target: 'Observation.valueQuantity',
    beforeConvert: (data) => {
      let valueQuantity = JSON.parse(`
      {
        "value" : 0.6,
        "unit" : "cm",
        "system" : "http://unitsofmeasure.org",
        "code" : "cm"
      }
      `);

      valueQuantity.value = parseInt(String(data));

      return valueQuantity;
    }
  },
  {
    source: 'Size of viable invasive focus',
    target: 'Observation.valueQuantity',
    beforeConvert: (data) => {
      let valueQuantity = JSON.parse(`
      {
        "value" : 0.6,
        "unit" : "cm",
        "system" : "http://unitsofmeasure.org",
        "code" : "cm"
      }
      `);

      valueQuantity.value = parseInt(String(data));

      return valueQuantity;
    }
  },
  {
    source: 'Estimated viable invasive tumor size',
    target: 'Observation.valueQuantity',
    beforeConvert: (data) => {
      let valueQuantity = JSON.parse(`
      {
        "value" : 0.6,
        "unit" : "cm",
        "system" : "http://unitsofmeasure.org",
        "code" : "cm"
      }
      `);

      valueQuantity.value = parseInt(String(data));

      return valueQuantity;
    }
  },
  {
    source: 'Size of invasive focus (cm)',
    target: 'Observation.valueQuantity',
    beforeConvert: (data) => {
      let valueQuantity = JSON.parse(`
      {
        "value" : 0.6,
        "unit" : "cm",
        "system" : "http://unitsofmeasure.org",
        "code" : "cm"
      }
      `);

      valueQuantity.value = parseInt(String(data));

      return valueQuantity;
    }
  }
]