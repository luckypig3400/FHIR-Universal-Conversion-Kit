const fs = require('fs');
// https://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-file-into-server-memory
var obj = JSON.parse(fs.readFileSync('../TWCR_ValueSets/TWCR_info.json', 'utf-8'));
// 檔案路徑要以FUCK核心所在的位置為基準

function fetchLatestTWCR(){
  var todayDate = new Date().toISOString().slice(0, 10);
  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

  if(todayDate > obj.lastCheckDate){
    // 今天尚未檢查TWCR FHIR IG網站是否更新，開始執行檢查


    obj.lastCheckDate = todayDate;
    fs.writeFileSync('../TWCR_ValueSets/TWCR_info.json', JSON.stringify(obj));
    // 回存最後的檢查日期
  }
}

module.exports = fetchLatestTWCR;