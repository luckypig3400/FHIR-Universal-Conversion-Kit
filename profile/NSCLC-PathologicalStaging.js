const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-PathologicalStaging',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Pathological-staging"
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
          code: "21914-7",
          display: "Stage group.other Cancer"
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

  // T category
  if (data.Tcategorybasedonthesizeofinvasivefocus != "") {
    data.Tcategory = data.Tcategorybasedonthesizeofinvasivefocus;
  }
  if (data.Tcategorybasedonthesizeofviableinvasivefocus != "") {
    data.Tcategory = data.Tcategorybasedonthesizeofviableinvasivefocus;
  }
  if (data.Tcategorybasedonviableinvasivetumorsizeonly != "") {
    data.Tcategory = data.Tcategorybasedonviableinvasivetumorsizeonly;
  }

  switch (true) {
    case data.Tcategory.includes("pTX"):
      data.Tcategory = "pTX";
      break;
    case data.Tcategory.includes("pT0"):
      data.Tcategory = "pT0";
      break;
    case data.Tcategory.includes("pTis"):
      data.Tcategory = "pTis";
      break;
    case data.Tcategory.includes("pT1mi"):
      data.Tcategory = "pT1mi";
      break;
    case data.Tcategory.includes("pT1a"):
      data.Tcategory = "pT1a";
      break;
    case data.Tcategory.includes("pT1b"):
      data.Tcategory = "pT1b";
      break;
    case data.Tcategory.includes("pT1c"):
      data.Tcategory = "pT1c";
      break;
    case data.Tcategory.includes("pT1"):
      data.Tcategory = "pT1";
      break;
    case data.Tcategory.includes("pT2a"):
      data.Tcategory = "pT2a";
      break;
    case data.Tcategory.includes("pT2b"):
      data.Tcategory = "pT2b";
      break;
    case data.Tcategory.includes("pT2"):
      data.Tcategory = "pT2";
      break;
    case data.Tcategory.includes("pT3"):
      data.Tcategory = "pT3";
      break;
    case data.Tcategory.includes("pT4"):
      data.Tcategory = "pT4";
      break;
  }

  // Lymph nodes
  if (data.Lymphnodes != "") {
    data.Lymphnode = data.Lymphnodes;
  }

  switch (true) {
    case data.Lymphnode.includes("NX"):
      data.Lymphnode = "NX";
      break;
    case data.Lymphnode.includes("N0"):
      data.Lymphnode = "N0";
      break;
    case data.Lymphnode.includes("N1"):
      data.Lymphnode = "N1";
      break;
    case data.Lymphnode.includes("N2"):
      data.Lymphnode = "N2";
      break;
    case data.Lymphnode.includes("N3"):
      data.Lymphnode = "N3";
      break;
    case data.Lymphnode.includes("not present"):
      data.Lymphnode = "N0";
      break;
    case data.Lymphnode.includes("all without metastatic tumor"):
      data.Lymphnode = "N0";
      break;
  }

  // Metastasis
  switch (true) {
    case data.Mcategory.indexOf("pMX") !== -1:
      data.Mcategory = "pMX";
      break;
    case data.Mcategory.indexOf("pM0") !== -1:
      data.Mcategory = "pM0";
      break;
    case data.Mcategory.indexOf("pM1a") !== -1:
      data.Mcategory = "pM1a";
      break;
    case data.Mcategory.indexOf("pM1b") !== -1:
      data.Mcategory = "pM1b";
      break;
    case data.Mcategory.indexOf("pM1c") !== -1:
      data.Mcategory = "pM1c";
      break;
    case data.Mcategory.indexOf("pM1") !== -1:
      data.Mcategory = "pM1";
      break;
  }

  // Staging
  switch (true) {
    case data.Pathologicalstaging.includes("TisN0"):
      data.Pathologicalstaging = "0";
      break;
    case data.Pathologicalstaging.includes("T1miN0"):
    case data.Pathologicalstaging.includes("T1aN0"):
      data.Pathologicalstaging = "IA1";
      break;
    case data.Pathologicalstaging.includes("T1bN0"):
      data.Pathologicalstaging = "IA2";
      break;
    case data.Pathologicalstaging.includes("T1cN0"):
      data.Pathologicalstaging = "IA3";
      break;
    case data.Pathologicalstaging.includes("T2aN0"):
      data.Pathologicalstaging = "IB";
      break;
    case data.Pathologicalstaging.includes("T2bN0"):
      data.Pathologicalstaging = "IIA";
      break;
    case data.Pathologicalstaging.includes("T1aN1"):
    case data.Pathologicalstaging.includes("T1bN1"):
    case data.Pathologicalstaging.includes("T1cN1"):
    case data.Pathologicalstaging.includes("T2aN1"):
    case data.Pathologicalstaging.includes("T2bN1"):
    case data.Pathologicalstaging.includes("T3N0"):
      data.Pathologicalstaging = "IIB";
      break;
    case data.Pathologicalstaging.includes("T1aN2"):
    case data.Pathologicalstaging.includes("T1bN2"):
    case data.Pathologicalstaging.includes("T1cN2"):
    case data.Pathologicalstaging.includes("T2aN2"):
    case data.Pathologicalstaging.includes("T2bN2"):
    case data.Pathologicalstaging.includes("T3N1"):
    case data.Pathologicalstaging.includes("T4N0"):
    case data.Pathologicalstaging.includes("T4N1"):
      data.Pathologicalstaging = "IIIA";
      break;
    case data.Pathologicalstaging.includes("T1aN3"):
    case data.Pathologicalstaging.includes("T1bN3"):
    case data.Pathologicalstaging.includes("T1cN3"):
    case data.Pathologicalstaging.includes("T2aN3"):
    case data.Pathologicalstaging.includes("T2bN3"):
    case data.Pathologicalstaging.includes("T3N2"):
    case data.Pathologicalstaging.includes("T4N2"):
      data.Pathologicalstaging = "IIIB";
      break;
    case data.Pathologicalstaging.includes("T3N3"):
    case data.Pathologicalstaging.includes("T4N3"):
      data.Pathologicalstaging = "IIIC";
      break;
    case data.Pathologicalstaging.includes("M1a"):
    case data.Pathologicalstaging.includes("M1b"):
      data.Pathologicalstaging = "IVA";
      break;
    case data.Pathologicalstaging.includes("M1c"):
      data.Pathologicalstaging = "IVB";
      break;
    case data.Pathologicalstaging.includes("Tis"):
      data.Pathologicalstaging = "0";
      break;
    case data.Pathologicalstaging.includes("T1mi"):
    case data.Pathologicalstaging.includes("T1a"):
      data.Pathologicalstaging = "IA1";
      break;
    case data.Pathologicalstaging.includes("T1b"):
      data.Pathologicalstaging = "IA2";
      break;
    case data.Pathologicalstaging.includes("T1c"):
      data.Pathologicalstaging = "IA3";
      break;
    case data.Pathologicalstaging.includes("T2a"):
      data.Pathologicalstaging = "IB";
      break;
    case data.Pathologicalstaging.includes("T2b"):
      data.Pathologicalstaging = "IIA";
      break;
    case data.Pathologicalstaging.includes("T3"):
      data.Pathologicalstaging = "IIB";
      break;
    case data.Pathologicalstaging.includes("T4"):
      data.Pathologicalstaging = "IIIA";
      break;
  }


  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-PathologicalStaging-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Pathologicalstaging',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-pTNM",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      valueCodeableConcept.coding[0].code = data;
      let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", data);
      valueCodeableConcept.coding[0].display = displayValue;

      return valueCodeableConcept;
    }
  },
  {
    source: 'Tcategory',
    target: 'Observation.hasMember',
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
  },
  {
    source: 'Lymphnode',
    target: 'Observation.hasMember',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-pN",
            "code" : "code",
            "display" : "display"
          }
        ]
      }
      `);

      let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json", data);
      valueCodeableConcept.coding[0].code = data;
      valueCodeableConcept.coding[0].display = displayValue;

      return valueCodeableConcept;
    }
  },
  {
    source: 'Mcategory',
    target: 'Observation.hasMember',
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