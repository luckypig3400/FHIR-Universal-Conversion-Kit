const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-Lymphnodes',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Lymph-nodes"
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
          code: "21900-6",
          display: "Regional lymph nodes.pathology [Class] Cancer"
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

  if (data.Lymphnodes != "") {
    data.Lymphnode = data.Lymphnodes;
  }

  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-Lymphnodes-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Lymphnode',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-pN",
            "code" : "code",
            "display" : "display"
          }
        ],
        "text":"all without metastatic tumor"
      }
      `);

      if (data.includes("NX")) {
        valueCodeableConcept.coding[0].code = "NX";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "NX");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N0")) {
        valueCodeableConcept.coding[0].code = "N0";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "N0");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N1")) {
        valueCodeableConcept.coding[0].code = "N1";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "N1");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N2")) {
        valueCodeableConcept.coding[0].code = "N2";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "N2");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N3")) {
        valueCodeableConcept.coding[0].code = "N3";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "N3");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("not present")) {
        valueCodeableConcept.coding[0].code = "N0";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "N0");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("all without metastatic tumor")) {
        valueCodeableConcept.coding[0].code = "N0";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", "N0");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      valueCodeableConcept.text = data;

      return valueCodeableConcept;
    }
  }
]