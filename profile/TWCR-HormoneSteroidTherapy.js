const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-HormoneSteroidTherapy',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-hormone-steroid-therapy-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Procedure-HormoneSteroidTherapyExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Procedure: {
    meta: {
      profile: [
        "profileURL"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">目前為空值，可根據使用需求自行產生這筆資料的摘要資訊並填入此欄位</div>"
    }
  }
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Procedure.id',
    beforeConvert: (data) => {
      return `TWCR-HormoneSteroidTherapy-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 申報醫院荷爾蒙/類固醇治療	HOMSTTF	code
    // 申報醫院荷爾蒙/類固醇治療開始日期	DHSTSTF	performedPeriod.start
  }
]