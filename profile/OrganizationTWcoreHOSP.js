module.exports.profile = {
  name: 'OrganizationTWcoreHOSP',
  version: '1.0.0',
  // fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
  // action: 'return', // return, upload
  
  // fhirServerBaseUrl: 'http://140.131.93.149:8080/fhir',
  fhirServerBaseUrl: 'http://192.168.50.6:8082/fhir',
  action: 'return',
}

module.exports.globalResource = {
  // Should be resource name
  Organization: {
		type: [
			{
				"coding" : [
					{
						"system" : "http://terminology.hl7.org/CodeSystem/organization-type",
						"code" : "prov"
					}
				]
			}
		]
  }
}

// Global Preprocessor Hook
// Data will run the following function before we iterate each fields
module.exports.beforeProcess = (data) => {
	console.log(`HOSP_ID: ${data.HOSP_ID}`);
	data.HOSP_ID_2 = data.HOSP_ID; //copy HOSP_ID as HOSP_ID_2，供兩次轉換
	
  return data
}

module.exports.fields = [
  {//HOSP_ID
    source: 'HOSP_ID',
    target: 'Organization.identifier',
    beforeConvert: (data) => {
		HOSP_ID_2=data;
		let identifier = 
			{
			"use" : "official",
			"type" : {
				"coding" : [
				{
					"system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
					"code" : "PRN"
				}
				]
			},
			"system" : "https://twcore.mohw.gov.tw/ig/twcore/CodeSystem/organization-identifier-tw",
			"value" : ""
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
  {
    source: 'text',
    target: 'Organization.text',
    // text已經組合成Object，直接回傳即可，無須再透過beforeConvert:()來處理

    // text.status (data.status)中 HL7 FHIR官方提供 generated | extensions | additional | empty

  },
  {//HOSP_STATUS
    source: 'HOSP_STATUS',
    target: 'Organization.active',
    beforeConvert: (data) => {
      // https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
      // let booleanValue = (data.toString().toLowerCase() === "true");
			let booleanValue = true;
			if(data != '0') booleanValue = false; 
			// "0:開業 1:停業 2:歇業 3:公告註銷 4:處停 5:處撤 6:換區歇業 7:跨局遷出 8:休診 9:變更負責人 
			// A:終止合約(違約被停) B:不續約(合約到期) C:醫院自行暫停"

      return booleanValue;
    }
  },
  {//HOSP_NAME
    source: 'HOSP_NAME',
    target: 'Organization.name',
    beforeConvert: (data) => {
      let type = data;
      type.coding = [type.coding];
      // 把coding按照FHIR Definition包成Array

      return type;
    }
  },
  {//HOSP_ABBR
    source: 'HOSP_ABBR',
    target: 'Organization.alias'
  },
  {//TEL
    source: 'TEL',
    target: 'Organization.telecom'
  },
  {//HOSP_ADDR
    source: 'HOSP_ADDR',
    target: 'Organization.address',
		beforeConvert: (data) => {
      let address={
				"use": "work",
				"type": "both",
				"text": ""
			};
      address.text = data;
			
      return address;
    }
  }
]