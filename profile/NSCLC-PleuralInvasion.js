const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-PleuralInvasion',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}


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
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
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

  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-Pleuralinvasion-${data}-${tools.getCurrentTimestamp()}`;
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
          },
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Invasion",
            "code" : "code",
            "display" : "display"
          }
        ],
        "text":"invades beyond the elastic layer (PL1)"
      }
      `);

      if (data.indexOf("present") != -1) {
        valueCodeableConcept.coding[0].code = "1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
      else if (data.indexOf("+") != -1) {
        valueCodeableConcept.coding[0].code = "1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
      else if (data.indexOf("(+)") != -1) {
        valueCodeableConcept.coding[0].code = "1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
      else if (data.indexOf("absent") != -1) {
        valueCodeableConcept.coding[0].code = "0";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "0");
        valueCodeableConcept.coding[0].display = displayValue;
      }
      else if (data.indexOf("-") != -1) {
        valueCodeableConcept.coding[0].code = "0";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "0");
        valueCodeableConcept.coding[0].display = displayValue;
      }
      else if (data.indexOf("(-)") != -1) {
        valueCodeableConcept.coding[0].code = "0";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "0");
        valueCodeableConcept.coding[0].display = displayValue;
      }
      else if (data != null) {
        valueCodeableConcept.coding[0].code = "8";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Invasion.json", "8");
        valueCodeableConcept.coding[0].display = displayValue;
      }

      if (data.indexOf("PL0") != -1) {
        valueCodeableConcept.coding[1].code = "PL0";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Pleural-Invasion.json", "PL0");
        valueCodeableConcept.coding[1].display = displayValue;
      }
      if (data.indexOf("PL1") != -1) {
        valueCodeableConcept.coding[1].code = "PL1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Pleural-Invasion.json", "PL1");
        valueCodeableConcept.coding[1].display = displayValue;
      }
      if (data.indexOf("PL2") != -1) {
        valueCodeableConcept.coding[1].code = "PL2";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Pleural-Invasion.json", "PL2");
        valueCodeableConcept.coding[1].display = displayValue;
      }
      if (data.indexOf("PL3") != -1) {
        valueCodeableConcept.coding[1].code = "PL3";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Pleural-Invasion.json", "PL3");
        valueCodeableConcept.coding[1].display = displayValue;
      }
      if (data.indexOf("PLX") != -1) {
        valueCodeableConcept.coding[1].code = "PLX";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Pleural-Invasion.json", "PLX");
        valueCodeableConcept.coding[1].display = displayValue;
      }
      valueCodeableConcept.text = data;
      return valueCodeableConcept;
    }
  }
]