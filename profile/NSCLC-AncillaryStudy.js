const checkLUNG = require("../NSCLC_ValueSets/fetchLatestNSCLC.js");
const tools = require("../NSCLC_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'NSCLC-AncillaryStudy',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/Observation-LC-Ancillary-studies"
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
          system: "http://mitwfhir.dicom.org.tw/fhir/CodeSystem/NSCLC-MicroscopicFinding",
          code: "Ancillary",
          display: "Ancillary studies"
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

  if (data.Immunohistochemicalstudy != "") {
    data.Ancillarystudy = data.Immunohistochemicalstudy;
  }
  if (data.Immunohistochemicalstains != "") {
    data.Ancillarystudy = data.Immunohistochemicalstains;
  }
  if (data.Others != "") {
    data.Ancillarystudy = data.Others;
  }
  if (data.EBVISH != "") {
    data.Ancillarystudy = data.EBVISH;
  }

  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `NSCLC-AncillaryStudy-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'Ancillarystudy',
    target: 'Observation.valueString',
    beforeConvert: (data) => {
      valueString = data;
      return valueString;
    }
  }

]
