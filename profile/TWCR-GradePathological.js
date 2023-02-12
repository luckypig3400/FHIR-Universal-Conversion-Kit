const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-GradePathological',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-grade-pathological-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Observation-GradePathologicalExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Observation: {
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/grade-pathological-profile"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">目前為空值，可根據使用需求自行產生這筆資料的摘要資訊並填入此欄位</div>"
    },
    status: "registered", //registered | preliminary | final | amended +
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "75621-3",
          display: "TNM pathologic staging after surgery panel Cancer"
        }
      ]
    }
  }
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Observation.id',
    beforeConvert: (data) => {
      return `TWCR-GradePathological-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    // 病理分級/分化	CISTCR31	valueCodeableConcept.coding[].code
    // TWCR-GradeClinical已使用CISTCR31，此份profile疑似應使用CISTCR32的欄位資料
    source: 'CISTCR32',
    target: 'Observation.valueCodeableConcept',
    beforeConvert: (data) => {
      let valueCodeableConcept = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/grade-pathological-codesystem",
            "code" : "code",
            "display" : "displayValue"
          }
        ]
      }
      `);
      data = String(data).toUpperCase(); //其CodeSystem定義值均為大寫字母
      // https://mitw.dicom.org.tw/IG/TWCR_SF/ValueSet-grade-pathological-valueset.html

      valueCodeableConcept.coding[0].code = data;
      let displayValue = tools.searchCodeSystemDisplayValue("../TWCR_ValueSets/definitionsJSON/CodeSystem-grade-pathological-codesystem.json", data);
      valueCodeableConcept.coding[0].display = displayValue;

      return valueCodeableConcept;
    }
  }
]