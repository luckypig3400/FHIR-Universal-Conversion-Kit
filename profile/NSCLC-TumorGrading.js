const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-TumorGrading',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Tumor-grading"
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
          system: "http://snomed.info/sct",
          code: "397005006",
          display: "World Health Organization tumor classification (observable entity)"
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


  if (data.TumorgradingWHO2021 != "")
    {
      data.Tumordifferentiation = data.TumorgradingWHO2021;
    }
  if (data.Tumorgrading != "")
    {
      data.Tumordifferentiation = data.Tumorgrading;
    }
    
  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-TumorGrading-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Tumordifferentiation',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-Grading",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      if (data.toLowerCase().indexOf("well differentiated") != -1)
        {
          valueCodeableConcept.coding[0].code = "G1";
          let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Grading.json", "G1");
          valueCodeableConcept.coding[0].display = displayValue;
        }
      if (data.toLowerCase().indexOf("moderately differentiated") != -1)
        {
          valueCodeableConcept.coding[0].code = "G2";
          let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Grading.json", "G2");
          valueCodeableConcept.coding[0].display = displayValue;
        }
      if (data.toLowerCase().indexOf("poorly differentiated") != -1)
        {
          valueCodeableConcept.coding[0].code = "G3";
          let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Grading.json", "G3");
          valueCodeableConcept.coding[0].display = displayValue;
        }
      if (data.toLowerCase().indexOf("undifferentiated") != -1)
        {
          valueCodeableConcept.coding[0].code = "G4";
          let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Grading.json", "G4");
          valueCodeableConcept.coding[0].display = displayValue;
        }
      if (data.toLowerCase().indexOf("cannot be assessed") != -1)
        {
          valueCodeableConcept.coding[0].code = "GX";
          let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Grading.json", "GX");
          valueCodeableConcept.coding[0].display = displayValue;
        }
      if (data.toLowerCase().indexOf("not applicable") != -1)
        {
          valueCodeableConcept.coding[0].code = "GN";
          let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-Grading.json", "GN");
          valueCodeableConcept.coding[0].display = displayValue;
        }

      return valueCodeableConcept;
    }
  }
]