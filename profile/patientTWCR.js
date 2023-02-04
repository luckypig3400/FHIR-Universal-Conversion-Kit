module.exports.profile = {
  name: 'patientTWCR',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}

module.exports.globalResource = {
  // Should be resource name
  Patient: {
    // 全域資料參考自以下網頁:
    // https://mitw.dicom.org.tw/IG/TWCR_SF/Patient-PatientExample.json.html
    meta: {
      profile: [
        "https://mitw.dicom.org.tw/IG/TWCR/StructureDefinition/patient-profile"
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
    target: 'Patient.id',
    beforeConvert: (data) => {
      return `patTWCR-${data}`
    }
  },
  {
    source: 'idCardNumber',
    target: 'Patient.identifier',
    beforeConvert: (data) => {
      let identifier = data;
      identifier.type.coding = [identifier.type.coding];

      return identifier;
    }
  },
  {
    source: 'medicalRecord',
    target: 'Patient.identifier',
    beforeConvert: (data) => {
      let identifier = data;
      identifier.type.coding = [identifier.type.coding];

      return identifier;
    }
  },
  {
    source: 'active',
    target: 'Patient.active',
    beforeConvert: (data) => {
      // https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
      let booleanValue = (data.toString().toLowerCase() === "true");

      return booleanValue;
    }
  },
  {
    source: 'name',
    target: 'Patient.name',
    /*
    beforeConvert: (data) => {
      let name = data;
      name.given = [name.given];

      return name;
    }
    */
  },
  {
    source: 'telecom',
    target: 'Patient.telecom',
  },
  {
    source: 'gender',
    target: 'Patient.gender',
    beforeConvert: (data) => {
      if (data == "1")
        return "male";
      else if (data == "2")
        return "female";
      else
        return "other";
    }
  },
  {
    source: 'birthDate',
    target: 'Patient.birthDate',
  },
  {
    source: 'address',
    target: 'Patient.address',
  },
  /*
  {
    source: 'maritalStatus',
    target: 'Patient.maritalStatus',
    beforeConvert: (data) => {
      let maritalStatus = data;
      maritalStatus.coding = [maritalStatus.coding];

      return maritalStatus;
    }
  },
  {
    source: 'photo',
    target: 'Patient.photo',
  },
  {
    source: 'contact',
    target: 'Patient.contact',
    beforeConvert: (data) => {
      let contact = data;
      contact.relationship.coding = [contact.relationship.coding];

      contact.relationship = [contact.relationship];

      contact.name.given = [contact.name.given];

      contact.telecom = [contact.telecom];

      return contact;
    }
  },
  {
    source: 'communication',
    target: 'Patient.communication',
    beforeConvert: (data) => {
      let communication = data;
      communication.language.coding = [communication.language.coding];

      return communication;
    }
  },
  {
    source: 'managingOrganization',
    target: 'Patient.managingOrganization',
  }
  */
]