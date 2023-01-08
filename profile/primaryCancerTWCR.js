module.exports.profile = {
  name: 'primaryCancerTWCR',
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
      return `primaryCancerTWCR-${data}`
    }
  },
  {
    // 嘗試轉換Extension
  },
  {
    source: 'subject',
    target: 'Condition.subject'
  },
  { // optional
    source: 'encounter',
    target: 'Condition.encounter'
  },
  { // optional
    source: 'recorder',
    target: 'Condition.recorder'
  },
  /*
  {
    source: 'evidence',
    target: 'Condition.evidence',
    beforeConvert: (data) => {
      let evidence = data;
      evidence.code = [evidence.code];// 把code按照mitw定義包成Array
      // https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-condition-profile.html

      evidence.coding = [evidence.coding];// 把coding按照FHIR Definition包成Array

      return evidence;
    }
  }
  */
]