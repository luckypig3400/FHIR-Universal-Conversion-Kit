module.exports.profile = {
  name: 'doctor',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
  token: 'your-token-string' // This line can be deleted if unused
}

module.exports.globalResource = {
  Practitioner: {
    communication: [{
      coding: [{
        system: "urn:ietf:bcp:47",
        code: "zh-TW",
        display: "Chinese (Taiwan)"
      }]
    }],
    text: "zh-TW 繁體中文"
  }
}
// REF1: http://hl7.org/fhir/R4/valueset-languages.html
// REF2: https://www.hl7.org/fhir/practitioner-example-f003-mv.json.html

module.exports.fields = [
  {
    source: 'id',
    target: 'Practitioner.id',
    beforeConvert: (data) => {
      return `prac-${data}`
    }
  },
  {
    source: 'doctorLicense',
    target: 'Practitioner.identifier',
    beforeConvert: (data) => {
      return {
        use: 'official',
        system: 'https://www.vghtc.gov.tw/',
        value: data
      }
    }
  },
  {
    source: 'zhTW_name',
    target: 'Practitioner.name',
    beforeConvert: (data) => {
      return {
        use: 'official',
        text: data,
      }
    }
  },
  {
    source: 'gender',
    target: 'Practitioner.gender'
  },
  {
    source: 'birthDate',
    target: 'Practitioner.birthDate'
  },
]