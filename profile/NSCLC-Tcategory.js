const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-Tcategory',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-T-category"
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
          system: "http://loinc.org",
          code: "21899-0",
          display: "Primary tumor.pathology Cancer"
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


  if (data.Tcategorybasedonthesizeofinvasivefocus != "") {
    data.Tcategory = data.Tcategorybasedonthesizeofinvasivefocus;
  }
  if (data.Tcategorybasedonthesizeofviableinvasivefocus != "") {
    data.Tcategory = data.Tcategorybasedonthesizeofviableinvasivefocus;
  }
  if (data.Tcategorybasedonviableinvasivetumorsizeonly != "") {
    data.Tcategory = data.Tcategorybasedonviableinvasivetumorsizeonly;
  }

  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-Tcategory-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Tcategory',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-pT",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      if (data.includes("pTX")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pTX");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pTX";
      }
      else if (data.includes("pT0")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT0");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT0";
      }
      else if (data.includes("pTis")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pTis");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pTis";
      }
      else if (data.includes("pT1mi")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1mi");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1mi";
      }
      else if (data.includes("pT1a")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1a");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1a";
      }
      else if (data.includes("pT1b")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1b");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1b";
      }
      else if (data.includes("pT1c")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1c");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1c";
      }
      else if (data.includes("pT1")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1";
      }
      else if (data.includes("pT2a")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT2a");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT2a";
      }
      else if (data.includes("pT2b")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT2b");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT2b";
      }
      else if (data.includes("pT2")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT2");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT2";
      }
      else if (data.includes("pT3")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT3");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT3";
      }
      else if (data.includes("pT4")) {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT4");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT4";
      }

      return valueCodeableConcept;
    }
  }
]