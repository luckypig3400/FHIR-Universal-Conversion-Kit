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
    source: 'category',
    target: 'Condition.category',
    beforeConvert: (data) => {
      let category = data;
      category.coding = [category.coding];// 把coding按照FHIR Definition包成Array

      return category;
    }
  },
  {
    source: 'code',
    target: 'Condition.code',
    beforeConvert: (data) => {
      let code = data;
      code.coding = [code.coding];// 把coding按照FHIR Definition包成Array

      return code;
    }
  },
  {
    source: 'subject',
    target: 'Condition.subject'
  },
  {
    source: 'onsetDateTime',
    target: 'Condition.onsetDateTime'
  }
]