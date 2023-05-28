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
  // 在開始轉換前檢查TWCR的package是否有更新

  // *依據申報內容不同有可能為 valueCodeableConcept 或 valueQuantity
  // 經過beforeProcess的處理後再決定target

  // beforeProcess超級強大的! 感覺真的什麼資料都可以處理!!!
  // console.log(data);

  data.Histologictype = data.Histologictype.toString().toUpperCase();
  // 將所有字元轉大寫再比較，或許更能避免資料中大小寫差異造成資料轉換時被忽略的窘境

  if (data.Histologictype == "Minimally invasive adenocarcinoma".toUpperCase()) {
    data.Histologictype = "Minimally invasive adenocarcinoma, non-mucinous";
  }
  else if (data.Histologictype == "Adenocarcinoma acinar predominant".toUpperCase()) {
    data.Histologictype = "Acinar adenocarcinoma";
  }
  else if (data.Histologictype == "Adenocarcinoma micropapillary predominant".toUpperCase()) {
    data.Histologictype = "Micropapillary adenocarcinoma";
  }
  else if (data.Histologictype == "Adenocarcinoma solid predominant".toUpperCase()) {
    data.Histologictype = "Solid adenocarcinoma";
  }
  else if (data.Histologictype == "Adenocarcinoma papillary predominant".toUpperCase()) {
    data.Histologictype = "Papillary adenocarcinoma, NOS";
  }
  else if (data.Histologictype == "Adenocarcinoma lepidic predominant".toUpperCase()) {
    data.Histologictype = "Lepidic adenocarcinoma";
  }
  else if (data.Histologictype == "Squamous cell carcinoma non-keratinizing".toUpperCase()) {
    data.Histologictype = "Squamous cell carcinoma, nonkeratinizing, NOS";
  }
  else if (data.Histologictype == "Squamous cell carcinoma keratinizing".toUpperCase()) {
    data.Histologictype = "Squamous cell carcinoma, keratinizing, NOS"
  }
  else if (data.Histologictype == "Adenocarcinoma in situ".toUpperCase()) {
    data.Histologictype = "Adenocarcinoma in situ, NOS";
  }
  else if (data.Histologictype == "Invasive mucinous adenocarcinoma".toUpperCase()) {
    data.Histologictype = "Mucinous adenocarcinoma";
  }
  else if (data.Histologictype == "Non-small cell carcinoma admixed with round cell sarcomatoid area") {
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

      // let codevalue = tools.searchValueSetDisplayValue("../NSCLC_ValueSets/definitions.json/ValueSet-ICD-O-3-Morphology.json", data);
      let codevalue = "Error";
      valueCodeableConcept.coding[0].code = codevalue;
      valueCodeableConcept.coding[0].display = data;

      return valueCodeableConcept;
    }
  }

]