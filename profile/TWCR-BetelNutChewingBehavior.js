const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-BetelNutChewingBehavior',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-betel-nut-chewing-behavior-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-BetelNutChewingBehaviorExample.json.html

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
      return `TWCR-BetelNutChewingBehavior-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 嚼檳榔行為	BETELBE	valueCodeableConcept
    // 詢問Lily 此profile binding的值集是否要另外設計(目前是用吸菸的CodeSystem)

    // 必須將BETELBE拆為三欄資料，否則無法順利轉換(除非可以關閉F.U.C.K自動在目標FHIR Resource加上[]的功能)
    source: 'BETELBE',
    target: 'Observation.component',
    beforeConvert: (data) => {
      let componentAmount = JSON.parse(`
      {
        "code" : {
          "coding" : [
            {
              "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/betel-nut-chewing-behavior-codesystem",
              "code" : "amount",
              "display" : "每日嚼檳榔量，以 ”顆” 計算"
            }
          ]
        },
        "valueCodeableConcept" : {
          "coding" : [
            {
              "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/betel-nut-chewing-amount-codesystem",
              "code" : "00",
              "display" : "無嚼檳榔"
            }
          ]
        }
      }
      `);

      return componentAmount;
    }
  },
  {
    source: 'BETELBE',
    target: 'Observation.component',
    beforeConvert: (data) => {
      let componentYear = JSON.parse(`
      {
        "code" : {
          "coding" : [
            {
              "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/betel-nut-chewing-behavior-codesystem",
              "code" : "year",
              "display" : "嚼檳榔年"
            }
          ]
        },
        "valueCodeableConcept" : {
          "coding" : [
            {
              "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/betel-nut-chewing-year-codesystem",
              "code" : "00",
              "display" : "無嚼檳榔"
            }
          ]
        }
      }
      `);

      return componentYear;
    }
  },
  {
    source: 'BETELBE',
    target: 'Observation.component',
    beforeConvert: (data) => {
      let componentQuit = JSON.parse(`
      {
        "code" : {
          "coding" : [
            {
              "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/betel-nut-chewing-behavior-codesystem",
              "code" : "quit",
              "display" : "戒嚼檳榔年"
            }
          ]
        },
        "valueCodeableConcept" : {
          "coding" : [
            {
              "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/betel-nut-chewing-quit-codesystem",
              "code" : "88",
              "display" : "無嚼檳榔"
            }
          ]
        }
      }
      `);

      return componentQuit;
    }
  }
]