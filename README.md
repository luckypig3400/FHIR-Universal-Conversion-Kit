# FHIR Universal Conversion Kit (Project F.U.C.K)

FHIR Universal Conversion Kit (F.U.C.K.) is a super awesome and sexy kit that can convert albitary data to HL7 FHIR data. 

### TODO List
- [x] [NASH profiles](https://mitw.dicom.org.tw/IG/NSCLC/NASHprofiles.html)頁面的 NAS Hprofiles可能為 NASH profiles
- [x] ~~產生10筆仿照子芸學姊提供的原始資料格式之假資料~~ (為保護個資，測試資料採用Postman傳送)
- [x] 驗證目前已有的Profiles能夠正常被F.U.C.K執行
(重新開核對Profiles能否正常運行尤其要特別注意HistologicType，這份Profile裡面轉換的邏輯判斷較多)
- [ ] 校驗目前已有的Profiles轉換出的資料於Code、Display部分是否存在Error或""空值
- [ ] 補完其餘NSCLC Profiles(撰寫初版並和 :smiling_face_with_three_hearts: 子芸學姊💗 討論)

#### 校驗Profiles Error Code或空值的進度
- [x] NSCLC-AncillaryStudy
+ ~~[修復AncillaryStudy的category.coding.system網址錯誤](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/c722c72cca214957485dd991434936eb59d2b19c)~~ 以[FHIR R4版本的網址](http://hl7.org/fhir/R4/codesystem-observation-category.html)為值集採用標準
+ [解決AncillaryStudy的valueString遇到空值會被轉換出來](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/2cc9fceea34dbc90eaac7bf02144724fc5462dec)
- [x] NSCLC-AngiolymphaticInvasion
+ ~~[修復AngiolymphaticInvasion的category.coding.system網址錯誤](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/ecf5dd599138bcd9bd14ec433f1f70e18b607f3a)~~ 以[FHIR R4版本的網址](http://hl7.org/fhir/R4/codesystem-observation-category.html)為值集採用標準
- [x] NSCLC-CellType
+ ~~[修復 CellType 的category.coding.system網址錯誤](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/16c21e44f32b89dddeb180b837c4ae064ef4358b)~~ 以[FHIR R4版本的網址](http://hl7.org/fhir/R4/codesystem-observation-category.html)為值集採用標準
+ [解決 CellType 的valueString遇到空值會被轉換出來](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/79e55cdd845b7de9d6c92b9fccfe95d81827e721)
- [x] NSCLC-GrossFinding
+ ~~[修復 GrossFinding 的category.coding.system網址錯誤](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/63cfb832ba7d35965be8691f3cd6c5aec96b6f81)~~ 以[FHIR R4版本的網址](http://hl7.org/fhir/R4/codesystem-observation-category.html)為值集採用標準
+ ⚠️ GrossFinding的source data欄位為GrossFinding，似乎不存在於原始csv資料中
- [x] NSCLC-Histologicpattern
+ ~~[修復 Histologicpattern 的category.coding.system網址錯誤](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/39464e4b4b34f19d9446fd0e29157b11f56024c0)~~ 以[FHIR R4版本的網址](http://hl7.org/fhir/R4/codesystem-observation-category.html)為值集採用標準
+ 將未使用到的coding object移除(有兩筆commits)[第一筆](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/5bafcbf446ba752131445b226c087f11bbf71264)、[第二筆](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/054149766bee026d5e8540acebf5f7de13531057)
+ [雖然是可選的，但我還是將valueCodeableConcept.text也轉換出來](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/ed4d1618da034c607c5cca01d389dd518dc81f5c)
+ [最後檢查轉換出來的valueCodeableConcept若為空值則不回傳](https://github.com/luckypig3400/FHIR-Universal-Conversion-Kit/commit/78d795e0248682600711f3e79dd62984ba4553f4)
- [x] NSCLC-HistologicType
+ 除了ValueSet-ICD-O-3-Morphology.json中有部分值集缺失外，沒有其他問題
- [x] NSCLC-Lymphnodes
- [x] NSCLC-Mcategory
+ Mcategory Profile於子芸學姊FHIR IG官網上名為Metastasis
+ 已將Mcategory為空值的Profile忽略掉不轉出valueCodeableConcept
- [x] NSCLC-NonTumorousParenchyma
- [x] NSCLC-PathologicalStaging
+ 修正Lymphnode的Code與Display查詢錯誤
+ 將beforeProcess內部多數if-else改為switch-case，方便摺疊程式碼
+ 修正Lymphnode的NX編碼疑似轉換錯誤
+ 所有欄位遇到空值就不轉換
+ 最後處理一些特殊值導致轉換為Error的傳入資料(例如:anthracosis、not submitted、separate等等)
- [ ] NSCLC-PathologicalStaging12
- [ ] NSCLC-PerineuralInvasion
- [ ] NSCLC-PleuralInvasion
- [ ] NSCLC-ResectionMargin
- [ ] NSCLC-SizeOfInvasionFocus
- [ ] NSCLC-STAS
- [ ] NSCLC-Tcategory
- [ ] NSCLC-Tcategory1
- [ ] NSCLC-Totaltumorsize
- [ ] NSCLC-TreatmentEffect
- [ ] NSCLC-TumorGrading
- [ ] NSCLC-TumorNecrosis

### Issues List(此區已棄用，各profile遇到的議題都放在上方checklist下方)
+ ~~NSCLC-HistologicType Profile中所查詢的`ValueSet-ICD-O-3-Morphology.json`似乎沒有定義值集~~(已解決，因為FHIR IG上的定義值集JSON包尚未更新至最新版)
+ ~~子芸學姊的FHIR IG官網上提供的[definitions.json.zip](https://mitw.dicom.org.tw/IG/NSCLC/downloads.html)似乎還沒更新到最新版(子芸學姊回復目前尚未更新到網站上)~~ 😍子芸學姊已於6/2更新最新版的定義檔至FHIR IG網站上了
+ Error NSCLC-HistologicType ValueSet 找不到對應的值(Keep中的筆記有詳細描述)
+ NSCLC-PleuralInvasion的valueCoadableConcept，在資料轉換上似乎少了[Pleural-Invasion的資料](https://mitw.dicom.org.tw/IG/NSCLC/Observation-Pleuralinvasion.json.html)("code" : "PL0")

## 非小細胞肺癌FHIR IG轉換profile資料欄位映射
### Data columns mapping Table for [Lung profiles](https://mitw.dicom.org.tw/IG/NSCLC/Lungprofiles.html#observation)

😸 基本上子芸學姊的欄位取名都一樣，但是因為變數名稱不能有空格，所以學姊全都把空格拿掉了 👧

⚠️ Gross Finding Profile目前尚未有原始資料可供測試

| 主要映射Profile(是欄位也是Profile名稱) | 其餘欄位                                                                                                                                                                  | 備註                                        |
|:-------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Histologictype                         |                                                                                                                                                                           | 縮空格                                      |
| Histologic pattern                     |                                                                                                                                                                           |                                             |
| Cell type                              | Mitosis                                                                                                                                                                   | 縮空格、Mitosis轉到Celltype                 |
| Total tumor size                       | Tumor size, Tumor bed size, Total tuamor size (cm)                                                                                                                        |                                             |
| Size of invasive focus                 | Size of viable invasive focus, Estimated viable invasive tumor size, Size of invasive focus (cm)                                                                          | 縮空格、Size of invasive focus (cm)括號拿掉 |
| Tumor differentiation                  | Tumor grading (WHO 2021), Tumor grading                                                                                                                                   | Tumor grading (WHO 2021)括號拿掉            |
| Angiolymphatic invasion                |                                                                                                                                                                           | 縮空格                                      |
| Perineural invasion                    |                                                                                                                                                                           | 縮空格                                      |
| Spread Through Air Spaces (STAS)       |                                                                                                                                                                           | STAS                                        |
| Tumornecrosis                          |                                                                                                                                                                           | 縮空格                                      |
| Pleural invasion                       |                                                                                                                                                                           | 縮空格                                      |
| Non-tumorous parenchyma                |                                                                                                                                                                           |                                             |
| Pathological staging                   |                                                                                                                                                                           |                                             |
| T category                             | T category<br>(based on the size of invasive focus), T category<br>(based on the size of viable invasive focus), T category<br>(based on viable invasive tumor size only) | 縮空格、拿括號                              |
| Anicllary studies                      | Ancillary study, Immunohistochemical study, EBV, ISH, Immunohistochemical stains, Immunnohistochemical stain, Others                                                      |                                             |
| Treatment effect in primary tumor      | Treatment effect in lymph node metastases, TreatmentEffect                                                                                                                |                                             |
| M category                             |                                                                                                                                                                           |                                             |
| Lymph nodes                            | Lymph node                                                                                                                                                                |                                             |
| Resection margin                       | Bronchus cut end, Cut end, Staple cut end                                                                                                                                 |                                             |

## Installation & Usage Overview
### 1. Make sure your system enviroment already meet the [Requirements](#requirements)

### 2. Follow the [Installation Steps](#installation) to install this Kit on your local machine

### 3. See [API Usage](#api) and test with [API Usage Example](#usage-example)

### 4. You can [Learn about F.U.C.K Profile](#profile) and start to [Create your FHIR Convert Profile](#how-to-create-your-fhir-convert-profile)

### 5. [Learn How to convert CSV file to Payload JSON](#how-to-convert-csv-to-payload-json)

### 6. We provide [TWcore 10 Basic FHIR Resources Convert Profile and Excel format template](#twcore-10-basic-fhir-resources)

---

## Requirements
- node.js 16.8.0
- Any Restful API Client Tools
  * [Postman](https://www.postman.com/downloads/)
  * VScode Extension: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Installation
### Step1.Clone this repository to your computer
```bash
$ git clone https://github.com/Lorex/FHIR-Universal-Conversion-Kit.git
```

### Step2.Install npm packages
```bash
$ cd src
$ npm install
```

### Step3.Run Service
#### Method 1 (Make sure you're in the project's root folder)
```bash
$ chmod +x ./start_server
$ ./start_server
```

#### Method 2 (Make sure you're in the `src` folder)
```bash
$ node app.js
```

## API

Server will default listen on port 1337.

### Usage Guide
API Endpoint
```
POST <serverurl>
```

Payload
```json
{
    "profile": "<Profile Name>",
    "data": [
        "Source Data",
    ]
}
```

Response
```json
{
    "success": true,
    "data": [
        "Response Data"
    ]
}
```

### Usage Example
API Endpoint
```
POST http://localhost:1337
```

Payload
```json
{
  "profile": "dental",
  "data": [
    {
      "doctor_id": "6"
    },
    {
      "doctor_id": "69"
    },
  ]
}
```

Response
<details>

```json
{
  "success": true,
  "data": [
    {
      "resourceType": "Bundle",
      "type": "transaction",
      "entry": [
        {
          "fullUrl": "https://hapi.fhir.tw/fhir/Practitioner/prac-6",
          "resource": {
            "resourceType": "Practitioner",
            "id": "prac-6"
          },
          "request": {
            "method": "PUT",
            "url": "/Practitioner/prac-6"
          }
        }
      ]
    },
    {
      "resourceType": "Bundle",
      "type": "transaction",
      "entry": [
        {
          "fullUrl": "https://hapi.fhir.tw/fhir/Practitioner/prac-69",
          "resource": {
            "resourceType": "Practitioner",
            "id": "prac-69"
          },
          "request": {
            "method": "PUT",
            "url": "/Practitioner/prac-69"
          }
        }
      ]
    }
  ]
}
```

</details>

## Profile

### Basic Knowledge

If you have many different data source formats, you can create separate profiles (also known as config files) for each of them.
Each profile can define different data sources, source fields, conversion rules, and preprocessors.

**ATTENTION: The 'Profile' in this section is NOT FHIR Profile**

Every source data will be processed and converted as the following workflow: 

![workflow](https://i.imgur.com/6JwsLXC.png)

### How to create your FHIR convert Profile

To define a profile, just create `<profileName>.js` in the `profile` folder simply, the server should automatically load all profiles at the start.

**ATTENTION: The 'Profile' in this section is NOT FHIR Profile**

This is an example of the profile:
```javascript
module.exports.profile = {
    // Name of the profile
    name: 'example',

    // version of the profile
    version: '1.0.0',

    // The base URL of the FHIR server, this field will affect the 'fullUrl' element in the generated bundle.
    fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',     // 

    // Whether should we do after conversion?
    // 'upload': Upload the converted data to the FHIR server and return the server response.
    // 'return': Don't upload, just return the converted data.
    action: 'upload',
    token: 'your-token-string' // You can add your token~
}

module.exports.globalResource = {
    // Should be resource name
    Patient: {
        // Defile resource template here
        active: true
        
        // If you want to reference to other resource of this bundle automatically, use '{ reference: #<ResourceType> }'
        managingOrganization: {
            reference: '#Organization',
        }
    },
    Practitioner: {
        active: true,
    },
}

// Global Preprocessor Hook
// Data will run the following function before we iterate each fields
module.exports.beforeProcess = (data) => {
    // Do something
    return data
}

// Define your fields and conversion rules here
module.exports.fields = [
    {
        // Field name of the source data
        source: 'pname',

        // Target element of FHIR resource which source data will converted to
        target: 'Patient.id',

        // Field preprocessor hook before we convert the source data
        beforeConvert: (data) => {
            return `pat-test2-${data}`
        }
    }
]

```

## How to convert csv to payload json

### 1. Open `csv2json_HTML_ver` folder
### 2. Open `csv2json.html` with your browser
### 3. Copy your CSV file content as text
### 4. Paste your CSV text in input box
![](https://i.imgur.com/q4vdPf3.png)
### 5. Copy your converted Payload JSON from output textbox and paste into your REST Client 😄

## TWcore 10 Basic FHIR Resources
### What is TWcore
+ https://twcore.mohw.gov.tw/ig/

### List of supported FHIR Resources
| **FHIR Resource Type** | **Corresponding F.U.C.K convert Profile** |
|------------------------|-------------------------------------------|
| Condition              | conditionMS.js                            |
| Encounter              | encounterMS.js                            |
| Location               | location.js                               |
| Medication             | medication-TWCore.js                      |
| MedicationRequest      | medicationRequestMS.js                    |
| Observation            | observationMS.js                          |
| Organization           | organizationMS.js                         |
| Patient                | patientMS.js                              |
| Practitioner           | practitionerMS.js                         |
| Procedure              | procedureMS.js                            |

### Excel format template Usage
All files are located in `twcore` folder

See the documentation for [How To Use TWcore Excel Format](./Excel-templates/twcore/how-to-use-twcore.md#excel範例格式使用說明)

### Convert Profile Usage Example
See the documentation for [How To Use TWcore Convert Profiles](./Excel-templates/twcore/how-to-use-twcore.md#fuck-profile使用範例)

## Special Thanks
🎉🎉🎉
### Fork from [Lorex L. Yang's Github](https://github.com/Lorex)
🥇🥇🥇
### Original Repo: [FHIR Universal Conversion Kit (Project F.U.C.K)](https://github.com/Lorex/FHIR-Universal-Conversion-Kit)
👍👍👍

## TODO List
- [x] 完善TWcore使用手冊