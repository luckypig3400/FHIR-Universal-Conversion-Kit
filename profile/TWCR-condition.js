const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-condition',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
let trID = "TimeRandomID";
module.exports.globalResource = {
  // Should be resource name
  Condition: {
    // 全域資料參考自以下網頁:
    // https://mitw.dicom.org.tw/IG/TWCR_SF/Condition-ConditionExample.json.html
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/condition-profile"
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
        "coding":
        {
          "system": "https://mitw.dicom.org.tw/IG/TWCR/CodeSystem/class-of-case-codesystem",
          "code": "codeValue",
          "display": "displayValue"
        }
      }`);
      // 此處的JSON String應避免帶有[]後續會比較好處理

      category.coding.code = data;
      category.coding.display = "申報醫院診斷，但未於申報醫院接受首次療程";
      // diplay應抓取相對的ValueSet並從中找出code對應的顯示值

      category.coding = [category.coding];// 把coding按照FHIR Definition包成Array

      return category;
      // ClassOfCase是category中的一個Slice
    }
  },
  {
    source: 'ClassOfDiagnosisStatus',
    target: 'Condition.category',
    beforeConvert: (data) => {
      let category = data;
      category.coding = [category.coding];// 把coding按照FHIR Definition包成Array

      return category;
      // ClassOfDiagnosisStatus是category中的一個Slice
    }
  },
  {
    source: 'ClassOfTreatmentStatus',
    target: 'Condition.category',
    beforeConvert: (data) => {
      let category = data;
      category.coding = [category.coding];// 把coding按照FHIR Definition包成Array

      return category;
      // ClassOfTreatmentStatus是category中的一個Slice
    }
  },
  {
    source: 'code',
    target: 'Condition.code',
    beforeConvert: (data) => {
      let code = data;

      code.coding.code = parseInt(code.coding.code);
      if (code.coding.code < 10) {
        let cacheNumber = code.coding.code;
        code.coding.code = "0" + String(cacheNumber);
        // 按照 https://mitw.dicom.org.tw/IG/TWCR_SF/ValueSet-sequence-number-valueset.html
        // 的定義值，把code value進行轉換
      }

      code.coding = [code.coding];// 把coding按照FHIR Definition包成Array

      return code;
    }
  },
  {
    source: 'subject',
    target: 'Condition.subject'
  },
  { // optional
    source: 'encounter',
    target: 'Condition.encounter',
    beforeConvert: (data) => {
      if (data.reference == "") {
        return null;
      }
      else
        return data;
    }
  },
  {
    source: 'onsetAge',
    target: 'Condition.onsetAge',
    beforeConvert: (data) => {
      let onsetAge = data;
      onsetAge.value = parseInt(onsetAge.value); // 根據FHIR的定義，應該要是正整數
      return onsetAge
    }
  },
  { // optional
    source: 'recorder',
    target: 'Condition.recorder',
    beforeConvert: (data) => {
      if (data.reference == "") {
        return null;
      }
      else
        return data;
    }
  },
  {
    source: 'evidence',
    target: 'Condition.evidence',
    beforeConvert: (data) => {
      let evidence = data;

      evidence.code.coding = [evidence.code.coding];// 把coding按照FHIR Definition包成Array

      evidence.code = [evidence.code];// 把code按照mitw定義包成Array
      // https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-condition-profile.html

      return evidence;
    }
  },
]