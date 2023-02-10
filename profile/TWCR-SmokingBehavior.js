const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-SmokingBehavior',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-smoking-behavior-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-SmokingBehaviorExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Observation: {
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
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `TWCR-SmokingBehavior-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 吸菸行為	SMOKBE	valueCodeableConcept

    // 需跟Lily確認 SMOKBE 值轉換到3個不同的FHIR Object的對應要如何Mapping
    // 需跟Lily確認  吸菸年值集的CodeSystem之code05的display是否要改為吸菸5年
  }
]