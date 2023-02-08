const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-condition',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-condition-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Condition-ConditionExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Condition: {
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/condition-profile"
      ]
    },
    text: {
      status: "empty",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">目前為空值，可根據使用需求自行產生這筆資料的摘要資訊並填入此欄位</div>"
    },
    subject: {
      reference: "Patient/PatientExample"
    },
  }
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Condition.id',
    beforeConvert: (data) => {
      return `TWCR-Condition-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'CLASS',
    target: 'Condition.category',
    beforeConvert: (data) => {
      checkTWCR();
      // 在首個轉換項目檢查TWCR的package是否有更新

      let category = JSON.parse(`{
        "coding":[
          {
            "system": "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/class-of-case-codesystem",
            "code": "codeValue",
            "display": "displayValue"
          }
        ]
      }`);

      category.coding[0].code = data;

      let displayValue = tools.searchCodeSystemDisplayValue("../TWCR_ValueSets/definitionsJSON/CodeSystem-class-of-case-codesystem.json", data);
      category.coding[0].display = displayValue;

      return category;
      // ClassOfCase是category中的一個Slice
    }
  },
  {
    source: 'CDS',
    target: 'Condition.category',
    beforeConvert: (data) => {
      let category = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/class-of-diangosis-status-codesystem",
            "code" : "codeValue",
            "display" : "displayValue"
          }
        ]
      }
      `);

      category.coding[0].code = data;
      
      let displayValue = tools.searchCodeSystemDisplayValue("../TWCR_ValueSets/definitionsJSON/CodeSystem-class-of-diangosis-status-codesystem.json", data);
      category.coding[0].display = displayValue;

      return category;
      // ClassOfDiagnosisStatus是category中的一個Slice
    }
  },
  {
    source: 'CTS',
    target: 'Condition.category',
    beforeConvert: (data) => {
      let category = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/class-of-treatment-status-codesystem",
            "code" : "codeValue",
            "display" : "displayValue"
          }
        ]
      }
      `);

      category.coding[0].code = data;
      
      let displayValue = tools.searchCodeSystemDisplayValue("../TWCR_ValueSets/definitionsJSON/CodeSystem-class-of-treatment-status-codesystem.json", data);
      category.coding[0].display = displayValue;

      return category;
      // ClassOfTreatmentStatus是category中的一個Slice
    }
  },
  {
    source: 'SEQNO',
    target: 'Condition.code',
    beforeConvert: (data) => {
      let code = JSON.parse(`
      {
        "coding" : [
          {
            "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/sequence-number-codesystem",
            "code" : "codeValue",
            "display" : "displayValue"
          }
        ]
      }
      `);

      code.coding[0].code = data;

      code.coding[0].code = parseInt(code.coding[0].code);
      if (code.coding[0].code < 10) {
        let cacheNumber = code.coding[0].code;
        code.coding[0].code = "0" + String(cacheNumber);
        // 按照 https://mitw.dicom.org.tw/IG/TWCR_SF/ValueSet-sequence-number-valueset.html
        // 的定義值，把code value進行轉換
      }

      let displayValue = tools.searchCodeSystemDisplayValue("../TWCR_ValueSets/definitionsJSON/CodeSystem-sequence-number-codesystem.json", String(code.coding[0].code));
      code.coding[0].display = displayValue;

      return code;
    }
  },
  {
    source: 'DISAGE',
    target: 'Condition.onsetAge',
    beforeConvert: (data) => {
      let onsetAge = JSON.parse(`
      {
        "value" : 60,
        "system" : "http://unitsofmeasure.org",
        "code" : "a"
      }
      `);
      onsetAge.value = parseInt(data); // 根據FHIR的定義，應該要是正整數
      return onsetAge;
    }
  },
  {
    source: 'DGNCON',
    target: 'Condition.evidence',
    beforeConvert: (data) => {
      let evidence = JSON.parse(`
      {
        "code" : [
          {
            "coding" : [
              {
                "system" : "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/diagnostic-confirmation-codesystem",
                "code" : "codeValue",
                "display" : "displayValue"
              }
            ]
          }
        ]
      }
      `);

      evidence.code[0].coding[0].code = data;
      
      let displayValue = tools.searchCodeSystemDisplayValue("../TWCR_ValueSets/definitionsJSON/CodeSystem-diagnostic-confirmation-codesystem.json", data);
      evidence.code[0].coding[0].display = displayValue;

      // https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-condition-profile.html
      return evidence;
    }
  },
]