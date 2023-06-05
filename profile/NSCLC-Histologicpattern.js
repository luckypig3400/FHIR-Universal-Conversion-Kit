const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-Histologicpattern',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Histologic-pattern"
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
          system: "http://snomed.info/sct",
          code: "255711007",
          display: "Pattern (attribute)"
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

  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-Histologicpattern-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Histologicpattern',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Histologic-pattern",
            "code" : "code",
            "display" : "display"
          },
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Histologic-pattern",
            "code" : "code",
            "display" : "display"
          },
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Histologic-pattern",
            "code" : "code",
            "display" : "display"
          },
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Histologic-pattern",
            "code" : "code",
            "display" : "display"
          },
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Histologic-pattern",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      if (data.indexOf("lepidic") != -1) {
        valueCodeableConcept.coding[0].code = "lepidic";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Histologic-pattern.json", "lepidic");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      if (data.indexOf("acinar") != -1) {
        valueCodeableConcept.coding[1].code = "acinar";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Histologic-pattern.json", "acinar");
        valueCodeableConcept.coding[1].display = displayvalue;
      }
      if (data.indexOf("papillary") != -1) {
        valueCodeableConcept.coding[2].code = "papillary";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Histologic-pattern.json", "papillary");
        valueCodeableConcept.coding[2].display = displayvalue;
      }
      if (data.indexOf("micropapillary") != -1) {
        valueCodeableConcept.coding[3].code = "micropapillary";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Histologic-pattern.json", "micropapillary");
        valueCodeableConcept.coding[3].display = displayvalue;
      }
      if (data.indexOf("solid") != -1) {
        valueCodeableConcept.coding[4].code = "solid";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Histologic-pattern.json", "solid");
        valueCodeableConcept.coding[4].display = displayvalue;
      }

      return valueCodeableConcept;
    }
  }
]