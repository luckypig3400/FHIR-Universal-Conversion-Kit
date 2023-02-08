const checkTWCR = require("../TWCR_ValueSets/fetchLatestTWCR.js");
const tools = require("../TWCR_ValueSets/tools.js");
// 檔案路徑要以FUCK核心所在的位置為基準

module.exports.profile = {
  name: 'TWCR-patient',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  action: 'return', // return, upload
}
// 此Profile的JSON結構資料參考自以下網頁:
// https://mitw.dicom.org.tw/IG/TWCR_SF/StructureDefinition-patient-profile.html
// 此Profile的完整JSON範例檔:
// https://mitw.dicom.org.tw/IG/TWCR_SF/Patient-PatientExample.json.html

module.exports.globalResource = {
  // Should be resource name
  Patient: {
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
      data = data.toString().replaceAll("*", "-");
      return `TWCR-Patient-${data}-${tools.getCurrentTimestamp()}`;
    }
  },
  {
    source: 'IDNUM', //idCardNumber.value
    target: 'Patient.identifier',
    beforeConvert: (data) => {
      checkTWCR();
      // 在首個轉換項目檢查TWCR的package是否有更新

      let identifier = JSON.parse(`
      {
        "type" : {
          "coding" : [
            {
              "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
              "code" : "NI",
              "display" : "National unique individual identifier"
            }
          ]
        },
        "system" : "http://www.moi.gov.tw/",
        "value" : "123456789"
      }
      `);
      identifier.value = data;

      return identifier;
    }
  },
  {
    source: 'PHISTNUM', //medicalRecord.value
    target: 'Patient.identifier',
    beforeConvert: (data) => {
      let identifier = JSON.parse(`
      {
        "type" : {
          "coding" : [
            {
              "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
              "code" : "MR",
              "display" : "Medical record number"
            }
          ]
        },
        "system" : "https://www.vghtpe.gov.tw/Index.action",
        "value" : "10216"
      }
      `);
      identifier.value = data;

      return identifier;
    }
  },
  {
    source: 'PATNAME', //name.text
    target: 'Patient.name',
    beforeConvert: (data) => {
      let name = JSON.parse(`
      {
        "text" : "Patient Name"
      }
      `);
      name.text = data;

      return name;
    }
  },
  {
    source: 'SEX',
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
    source: 'BIRTH', //birthDate
    target: 'Patient.birthDate',
    beforeConvert: (data) => {
      let YYYY = data[0] + data[1] + data[2] + data[3];
      let MM = data[4] + data[5];
      let DD = data[6] + data[7];

      return `${YYYY}-${MM}-${DD}`;
    }
  },
  {
    source: 'RESCODE', //address.postalCode
    target: 'Patient.address',
    beforeConvert: (data) => {
      let address = JSON.parse(`
      {
        "postalCode" : "112"
      }
      `);
      address.postalCode = data;

      return address;
    }
  }
]