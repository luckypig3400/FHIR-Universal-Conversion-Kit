const uuid = require('uuid');
const organizationId = uuid.v4();

module.exports.config = {
  name: 'OrganizationTWcoreHOSP',
  version: '1.0.0',
  fhirServerBaseUrl: 'https://hapi.fhir.org/baseR4',
  action: 'return',
  fhir_version: 'R4',  // FHIR 版本，可以是 'R4', 'R4B', 或 'R5'
  validate: false // 設定是否啟用驗證
}

module.exports.globalResource = {
  Organization: {
    // resourceType: 'Organization',
    type: [
      {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/organization-type",
            "code": "prov"
          }
        ]
      }
    ],
    // other fields
  },
}

// Global data pre-processor
module.exports.beforeProcess = (data) => {
  /*
  // Combine names
  data.fullName = `${data.lastName} ${data.firstName}`;
  
  // Add timestamp
  data.timestamp = new Date().toISOString();
  
  // Delete original lastName and firstName fields
  delete data.lastName;
  delete data.firstName;
  */
  console.log(`HOSP_ID: ${data.HOSP_ID}`);
  data.HOSP_ID_2 = data.HOSP_ID; //copy HOSP_ID as HOSP_ID_2，供兩次轉換

  return data;
}

module.exports.fields = [
  {//HOSP_ID
    source: 'HOSP_ID',
    target: 'Organization.identifier',
    beforeConvert: (data) => {
      HOSP_ID_2 = data;
      let identifier =
      {
        "use": "official",
        "type": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
              "code": "PRN"
            }
          ]
        },
        "system": "https://twcore.mohw.gov.tw/ig/twcore/CodeSystem/organization-identifier-tw",
        "value": ""
      };
      identifier.value = data;
      //identifier.type.coding = [identifier.type.coding];
      // 把coding按照FHIR Definition包成Array，後來直接複製TWcore醫事機構identifier的範例json結構，所以已是array

      return identifier;
    }
  },
  {//HOSP_ID_2
    source: 'HOSP_ID_2',
    target: 'Organization.id',
    beforeConvert: (data) => {
      return `OrganizationTWcoreHOSP-${data}`
    }
  },
]

// Add a global post-processor to add Organization resource
module.exports.afterProcess = (bundle) => {
  /*
  // Check if Organization resource already exists
  const organizationEntry = bundle.entry.find(entry => entry.resource.resourceType === 'Organization');

  if (!organizationEntry) {
    // If not, add Organization resource
    bundle.entry.unshift({
      fullUrl: `${module.exports.config.fhirServerBaseUrl}/Organization/${organizationId}`,
      resource: { id: organizationId, ...module.exports.globalResource.Organization },
      request: {
        method: 'PUT',
        url: `Organization/${organizationId}`
      }
    });
  }
  */

  return bundle;
}