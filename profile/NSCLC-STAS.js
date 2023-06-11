const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-STAS',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-STAS"
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
          code: "STAS",
          display: "Spread Through Air Spaces(STAS)"
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

  if (data.STAS.indexOf("present") != -1) {
    data.STAS = "1";
  }
  else if (data.STAS.indexOf("+") != -1) {
    data.STAS = "1";
  }
  else if (data.STAS.indexOf("(+)") != -1) {
    data.STAS = "1";
  }
  else if (data.STAS.indexOf("absent") != -1) {
    data.STAS = "0";
  }
  else if (data.STAS.indexOf("-") != -1) {
    data.STAS = "0";
  }
  else if (data.STAS.indexOf("(-)") != -1) {
    data.STAS = "0";
  }
  else if (data.STAS != null) {
    data.STAS = "8";
  }


  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-STAS-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'STAS',
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