module.exports.profile = {
  name: 'conditionTWCR',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Condition: {
  }
}

module.exports.fields = [
  {
    source: 'id',
    target: 'Condition.id',
    beforeConvert: (data) => {
      return `conTWCR-${data}`
    }
  },
  {
    source: 'ClassOfCase',
    target: 'Condition.category',
    beforeConvert: (data) => {
      let category = data;
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
      if(data.reference == ""){
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
      return parseInt(data); // 根據FHIR的定義，應該要是正整數
    }
  },
  { // optional
    source: 'recorder',
    target: 'Condition.recorder',
    beforeConvert: (data) => {
      if(data.reference == ""){
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