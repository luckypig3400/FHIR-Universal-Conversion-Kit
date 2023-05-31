const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-Mcategory',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Metastasis"
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
          code: "21901-4",
          display: "Distant metastases.pathology [Class] Cancer"
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

  if (data.Mcategory.indexOf("pMX") != -1)
      {
        data.Mcategory = "pMX";
      }
    else if (data.Mcategory.indexOf("pM0") != -1)
      {
        data.Mcategory = "pM0";
      }
    else if (data.Mcategory.indexOf("pM1a") != -1)
      {
        data.Mcategory = "pM1a";
      }
    else if (data.Mcategory.indexOf("pM1b") != -1)
      {
        data.Mcategory = "pM1b";
      }
    else if (data.Mcategory.indexOf("pM1c") != -1)
      {
        data.Mcategory = "pM1c";
      }
    else if (data.Mcategory.indexOf("pM1") != -1)
      {
        data.Mcategory = "pM1";
      }

  return data;

}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-Mcategory-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Mcategory',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-pM",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", data);
      valueCodeableConcept.coding[0].code = codevalue;
      valueCodeableConcept.coding[0].display = data;

    return valueCodeableConcept;

    }
  }
]