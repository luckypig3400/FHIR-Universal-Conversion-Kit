const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-DateOfFirstMicroscopicConfirmation',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-date-of-microscopic-confirmation-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Condition-DateOfFirstMicroscopicConfirmationExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Condition: {
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/date-of-microscopic-confirmation-profile"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">目前為空值，可根據使用需求自行產生這筆資料的摘要資訊並填入此欄位</div>"
    },
    subject: {
      reference: "Patient/PatientExample"
    }
  }
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Condition.id',
    beforeConvert: (data) => {
      return `TWCR-DateOfFirstMicroscopicConfirmation-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 首次顯微鏡檢證實日期	DFMC	onsetDateTime
    source: 'DFMC',
    target: 'Condition.onsetDateTime',
    beforeConvert: (data) => {
      let s = String(data);
      let YYYY = s[0] + s[1] + s[2] + s[3];
      let MM = s[4] + s[5];
      let DD = s[6] + s[7];

      return `${YYYY}-${MM}-${DD}`;
    }
  }
]