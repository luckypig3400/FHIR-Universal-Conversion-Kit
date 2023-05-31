const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-PathologicalStaging12',
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
if (data.Tcategorybasedonthesizeofinvasivefocus != "")
  {
    data.Tcategory = data.Tcategorybasedonthesizeofinvasivefocus;
  }
if (data.Tcategorybasedonthesizeofviableinvasivefocus != "")
  {
    data.Tcategory = data.Tcategorybasedonthesizeofviableinvasivefocus;
  }
if (data.Tcategorybasedonviableinvasivetumorsizeonly != "")
  {
    data.Tcategory = data.Tcategorybasedonviableinvasivetumorsizeonly;
  }

  if (data.Tcategory.includes("pTX"))
  {
    data.Tcategory = "pTX";
  }
  else if (data.Tcategory.includes("pT0"))
  {
    data.Tcategory = "pT0";
  }
  else if (data.Tcategory.includes("pTis"))
  {
    data.Tcategory = "pTis";
  }
  else if (data.Tcategory.includes("pT1mi"))
  {
    data.Tcategory = "pT1mi";
  }
  else if (data.Tcategory.includes("pT1a"))
  {
    data.Tcategory = "pT1a";
  }
  else if (data.Tcategory.includes("pT1b"))
  {
    data.Tcategory = "pT1b";
  }
  else if (data.Tcategory.includes("pT1c"))
  {
    data.Tcategory = "pT1c";
  }
  else if (data.Tcategory.includes("pT1"))
  {
    data.Tcategory = "pT1";
  }
  else if (data.Tcategory.includes("pT2a"))
  {
    data.Tcategory = "pT2a";
  }
  else if (data.Tcategory.includes("pT2b"))
  {
    data.Tcategory = "pT2b";
  }
  else if (data.Tcategory.includes("pT2"))
  {
    data.Tcategory = "pT2";
  }
  else if (data.Tcategory.includes("pT3"))
  {
    data.Tcategory = "pT3";
  }
  else if (data.Tcategory.includes("pT4"))
  {
    data.Tcategory = "pT4";
  }

// Lymph nodes
  if (data.Lymphnode != "")
    {
      data.NewLymphnodes = data.Lymphnode;
    }
  if (data.Lymphnodes != "")
    {
      data.NewLymphnodes = data.Lymphnodes;
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

    if (data.includes("TisN0"))
      {
        valueCodeableConcept.coding[0].code = "0";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "0");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T1miN0"))
      {
        valueCodeableConcept.coding[0].code = "IA1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T1aN0"))
      {
        valueCodeableConcept.coding[0].code = "IA1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T1bN0"))
      {
        valueCodeableConcept.coding[0].code = "IA2";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA2");
        valueCodeableConcept.coding[0].display = displayValue;
      }   
    else if (data.includes("T1cN0"))
      {
        valueCodeableConcept.coding[0].code = "IA3";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA3");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2aN0"))
      {
        valueCodeableConcept.coding[0].code = "IB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2bN0"))
      {
        valueCodeableConcept.coding[0].code = "IIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1aN1"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1bN1"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1cN1"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2aN1"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2bN1"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T3N0"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1aN2"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1bN2"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1cN2"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2aN2"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2bN2"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T3N1"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T4N0"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T4N1"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1aN3"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1bN3"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T1cN3"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2aN3"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2bN3"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T3N2"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T4N2"))
      {
        valueCodeableConcept.coding[0].code = "IIIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T3N3"))
      {
        valueCodeableConcept.coding[0].code = "IIIC";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIC");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T4N3"))
      {
        valueCodeableConcept.coding[0].code = "IIIC";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIC");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("M1a"))
      {
        valueCodeableConcept.coding[0].code = "IVA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IVA");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("M1b"))
      {
        valueCodeableConcept.coding[0].code = "IVA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IVA");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("M1c"))
      {
        valueCodeableConcept.coding[0].code = "IVB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IVB");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("Tis"))
      {
        valueCodeableConcept.coding[0].code = "0";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "0");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T1mi"))
      {
        valueCodeableConcept.coding[0].code = "IA1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T1a"))
      {
        valueCodeableConcept.coding[0].code = "IA1";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA1");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T1b"))
      {
        valueCodeableConcept.coding[0].code = "IA2";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA2");
        valueCodeableConcept.coding[0].display = displayValue;
      }   
    else if (data.includes("T1c"))
      {
        valueCodeableConcept.coding[0].code = "IA3";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IA3");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2a"))
      {
        valueCodeableConcept.coding[0].code = "IB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IB");
        valueCodeableConcept.coding[0].display = displayValue;
      }    
    else if (data.includes("T2b"))
      {
        valueCodeableConcept.coding[0].code = "IIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIA");
        valueCodeableConcept.coding[0].display = displayValue;
      } 
    else if (data.includes("T3"))
      {
        valueCodeableConcept.coding[0].code = "IIB";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIB");
        valueCodeableConcept.coding[0].display = displayValue;
      }
    else if (data.includes("T4"))
      {
        valueCodeableConcept.coding[0].code = "IIIA";
        let displayValue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pTNM.json", "IIIA");
        valueCodeableConcept.coding[0].display = displayValue;
      }
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

      if (data.includes("pTX"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pTX");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pTX";
      }
      else if (data.includes("pT0"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT0");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT0";
      }
      else if (data.includes("pTis"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pTis");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pTis";
      }
      else if (data.includes("pT1mi"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1mi");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1mi";
      }
      else if (data.includes("pT1a"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1a");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1a";
      }
      else if (data.includes("pT1b"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1b");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1b";
      }
      else if (data.includes("pT1c"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1c");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1c";
      }
      else if (data.includes("pT1"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT1");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT1";
      }
      else if (data.includes("pT2a"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT2a");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT2a";
      }
      else if (data.includes("pT2b"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT2b");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT2b";
      }
      else if (data.includes("pT2"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT2");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT2";
      }
      else if (data.includes("pT3"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT3");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT3";
      }
      else if (data.includes("pT4"))
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pT.json", "pT4");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pT4";
      }

      return valueCodeableConcept;
    }
  },
  {
    source: 'NewLymphnodes',
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
        ],
        "text":"all without metastatic tumor"
      }
      `);

      if (data.includes("NX"))
      {
        valueCodeableConcept.coding[0].code = "NX";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","NX");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N0"))
      {
        valueCodeableConcept.coding[0].code = "N0";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","N0");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N1"))
      {
        valueCodeableConcept.coding[0].code = "N1";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","N1");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N2"))
      {
        valueCodeableConcept.coding[0].code = "N2";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","N2");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("N3"))
      {
        valueCodeableConcept.coding[0].code = "N3";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","N3");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("not present"))
      {
        valueCodeableConcept.coding[0].code = "N0";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","N0");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      else if (data.includes("all without metastatic tumor"))
      {
        valueCodeableConcept.coding[0].code = "N0";
        let displayvalue = tools.searchCodeSystemDisplayValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pN.json","N0");
        valueCodeableConcept.coding[0].display = displayvalue;
      }
      valueCodeableConcept.text = data;

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

    if (data.indexOf("pMX") != -1)
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", "pMX");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pMX";
      }
    else if (data.indexOf("pM0") != -1)
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", "pM0");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pM0";
      }
    else if (data.indexOf("pM1a") != -1)
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", "pM1a");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pM1a";
      }
    else if (data.indexOf("pM1b") != -1)
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", "pM1b");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pM1b";
      }
    else if (data.indexOf("pM1c") != -1)
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", "pM1c");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pM1c";
      }
    else if (data.indexOf("pM1") != -1)
      {
        let codevalue = tools.searchCodeSystemCodeValue("../NSCLC_ValueSets/definitions.json/CodeSystem-NSCLC-pM.json", "pM1");
        valueCodeableConcept.coding[0].code = codevalue;
        valueCodeableConcept.coding[0].display = "pM1";
      }

    return valueCodeableConcept;

    }
  }
]