module.exports.profile = {
  name: 'doctor',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
  token: 'your-token-string' // This line can be deleted if unused
}

module.exports.globalResource = {

}

module.exports.fields = [
  {
    source: 'doctor_id',
    target: 'Practitioner.id',
    beforeConvert: (data) => {
      return `prac-${data}`
    }
    // },
    // {
    //     source: 'identifier',
    //     target: 'Patient.identifier',
    //     beforeConvert: (data) => {
    //         return {
    //             use: 'official',
    //             system: 'https://www.vghtc.gov.tw/',
    //             value: data,
    //         }
    //     }
    // },
    // {
    //     source: 'name',
    //     target: 'Patient.name',
    //     beforeConvert: (data) => {
    //         return {
    //             use: 'official',
    //             text: data,
    //         }
    //     }
    // },
  }
]