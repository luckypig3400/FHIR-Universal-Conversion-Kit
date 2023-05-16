const checkSugar = require("../SugarValueSets/fetchLatestSugarDefinition.js");
const tools = require("../SugarValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'DiagnosticReportLC',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/NSCLC/StructureDefinition-DiagnosticReport-LC.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/NSCLC/DiagnosticReport-DiagnosticReportLC.json.html

module.exports.globalResource = {
  // Should be resource name
  Condition: {
    meta: {
      profile: [
        "http://mitwfhir.dicom.org.tw/fhir/StructureDefinition/DiagnosticReport-LC"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">Current is empty</div>"
    }
  }
}

// Global Preprocessor Hook, data will run the following function before we iterate each fields
module.exports.beforeProcess = (data) => {
  checkSugar(); // 在開始轉換前檢查TWCR的package是否有更新

  // 在此可以對POST進來的原始資料進行處理!

  return data;
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Condition.id',
    beforeConvert: (data) => {
      return `TWCR-PrimaryCancer-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
]