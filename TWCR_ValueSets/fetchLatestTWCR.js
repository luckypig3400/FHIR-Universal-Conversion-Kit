const fs = require('fs');
// https://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-file-into-server-memory
var obj = JSON.parse(fs.readFileSync('../TWCR_ValueSets/TWCR_info.json', 'utf-8'));
// 檔案路徑要以FUCK核心所在的位置為基準

function fetchLatestTWCR() {
  var todayDate = new Date().toISOString().slice(0, 10);
  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

  if (todayDate > obj.lastCheckDate) {
    // 今天尚未檢查TWCR FHIR IG網站是否更新，開始執行檢查
    var https = require("https");
    // https://stackoverflow.com/questions/6819143/curl-equivalent-in-node-js
    var options = obj.officalSite;

    var req = https.request(options, function (res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');

      // 檢查網頁Header的文件最後更新日期
      var text1 = res.headers["last-modified"].toString();
      var text2 = obj.officalSiteLastModified.toString();
      if (-1 == text1.localeCompare(text2)) {
        // https://www.w3schools.com/jsref/jsref_localecompare.asp

        console.log("TWCR FHIR IG last-modified date: " + res.headers["last-modified"] +
          "is newer than the local file check result: " + obj.officalSiteLastModified
        );

        obj.officalSiteLastModified = res.headers["last-modified"];
        // 回存網頁最後更新日期
        fs.writeFileSync('../TWCR_ValueSets/TWCR_info.json', JSON.stringify(obj));
        // 將檢查紀錄寫回json文件

        // -----------------------------------
        // TWCR FHIR IG網站有更新，自動下載最新版Value Set package

        // -----------------------------------
      }

    });
    req.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();

    // -----------------------------------
    obj.lastCheckDate = todayDate;
    // 回存最後的檢查日期
    fs.writeFileSync('../TWCR_ValueSets/TWCR_info.json', JSON.stringify(obj));
    // 將檢查紀錄寫回json文件
  }
}

module.exports = fetchLatestTWCR;