const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: "NSCLC-HistologicType",
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}


module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Histologic-type"
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
          code: "33731-1",
          display: "Histology type in Cancer specimen Narrative"
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

  data.Histologictype = data.Histologictype.charAt(0).toUpperCase() + data.Histologictype.slice(1)

  if (data.Histologictype == "Minimally invasive adenocarcinoma") {
    data.Histologictype = "Minimally invasive adenocarcinoma, non-mucinous";
  }
  if (data.Histologictype == "Adenocarcinoma acinar predominant") {
    data.Histologictype = "Acinar adenocarcinoma";
  }
  if (data.Histologictype == "Adenocarcinoma micropapillary predominant") {
    data.Histologictype = "Micropapillary adenocarcinoma";
  }
  if (data.Histologictype == "Adenocarcinoma solid predominant") {
    data.Histologictype = "Solid adenocarcinoma";
  }
  if (data.Histologictype == "Adenocarcinoma papillary predominant") {
    data.Histologictype = "Papillary adenocarcinoma, NOS";
  }
  if (data.Histologictype == "Adenocarcinoma lepidic predominant") {
    data.Histologictype = "Lepidic adenocarcinoma";
  }
  if (data.Histologictype == "Squamous cell carcinoma non-keratinizing") {
    data.Histologictype = "Squamous cell carcinoma, nonkeratinizing, NOS";
  }
  if (data.Histologictype == "Squamous cell carcinoma keratinizing") {
    data.Histologictype = "Squamous cell carcinoma, keratinizing, NOS"
  }
  if (data.Histologictype == "Adenocarcinoma in situ") {
    data.Histologictype = "Adenocarcinoma in situ, NOS";
  }
  if (data.Histologictype == "Invasive mucinous adenocarcinoma") {
    data.Histologictype = "Mucinous adenocarcinoma";
  }
  if (data.Histologictype == "Non-small cell carcinoma admixed with round cell sarcomatoid area") {
    data.Histologictype = "Squamous cell carcinoma, sarcomatoid";
  }

  return data;

}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-HistologicType-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Histologictype',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/icd-o-3",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      let codevalue = tools.searchValueSetCodeValue("../NSCLC_ValueSets/definitions.json/ValueSet-ICD-O-3-Morphology.json", data);
      valueCodeableConcept.coding[0].code = codevalue;
      valueCodeableConcept.coding[0].display = data;

      return valueCodeableConcept;
    }
  }

]