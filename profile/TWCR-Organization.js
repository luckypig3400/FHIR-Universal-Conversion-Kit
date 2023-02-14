const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-Organization',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-organization-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Organization-OrganizationExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Organization: {
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/organization-profile"
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
    target: 'Organization.id',
    beforeConvert: (data) => {
      return `TWCR-Organization-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 申報醫院代碼	HOSCODE	identifier(identifier.value)
    source: 'HOSCODE',
    target: 'Organization.identifier',
    // 此部分參考TWcore FHIR IG的台灣醫事機構範例
    // https://twcore.mohw.gov.tw/ig/StructureDefinition-Organization-hosp-twcore.html
    beforeConvert: (data) => {
      let identifier = JSON.parse(`
      {
        "use" : "official",
        "type" : {
          "coding" : [
            {
              "system" : "https://twcore.mohw.gov.tw/tsfhir/CodeSystem/v2-0203",
              "code" : "HOI"
            }
          ]
        },
        "system" : "https://twcore.mohw.gov.tw/tsfhir/CodeSystem/organization-identifier-tw",
        "value" : "value"
      }
      `);
      // https://twcore.mohw.gov.tw/ig/Organization-org-hosp-example.json.html

      identifier.value = String(data);

      return identifier;
    }
  }
]