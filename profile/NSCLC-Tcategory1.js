const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-Tcategory1',
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

  if (data.Tcategory.includes("pTX")) {
    data.Tcategory = "pTX";
  }
  else if (data.Tcategory.includes("pT0")) {
    data.Tcategory = "pT0";
  }
  else if (data.Tcategory.includes("pTis")) {
    data.Tcategory = "pTis";
  }
  else if (data.Tcategory.includes("pT1mi")) {
    data.Tcategory = "pT1mi";
  }
  else if (data.Tcategory.includes("pT1a")) {
    data.Tcategory = "pT1a";
  }
  else if (data.Tcategory.includes("pT1b")) {
    data.Tcategory = "pT1b";
  }
  else if (data.Tcategory.includes("pT1c")) {
    data.Tcategory = "pT1c";
  }
  else if (data.Tcategory.includes("pT1")) {
    data.Tcategory = "pT1";
  }
  else if (data.Tcategory.includes("pT2a")) {
    data.Tcategory = "pT2a";
  }
  else if (data.Tcategory.includes("pT2b")) {
    data.Tcategory = "pT2b";
  }
  else if (data.Tcategory.includes("pT2")) {
    data.Tcategory = "pT2";
  }
  else if (data.Tcategory.includes("pT3")) {
    data.Tcategory = "pT3";
  }
  else if (data.Tcategory.includes("pT4")) {
    data.Tcategory = "pT4";
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

      let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", data);
      valueCodeableConcept.coding[0].code = codevalue;
      valueCodeableConcept.coding[0].display = data;


      return valueCodeableConcept;
    }
  }
]