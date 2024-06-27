function doGet(e) {
  Logger.log(JSON.stringify(e));
  var result = "Ok";
  if (!e || !e.parameter) {
    result = "No Parameters";
  } else {
    var sheet_id = "19y5RhCCJWDloytZ-g_5v7GUDf5r-pTnUvZ_es5KeGHU"; // Spreadsheet ID
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    var Curr_Date = new Date();
    rowData[0] = Curr_Date; // Date in column A
    var Curr_Time = Utilities.formatDate(Curr_Date, "Asia/Kolkata", "HH:mm:ss");
    rowData[1] = Curr_Time; // Time in column B
    for (var param in e.parameter) {
      Logger.log("In for loop, param=" + param);
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ":" + e.parameter[param]);
      switch (param) {
        case "hand_sign":
          rowData[2] = value; // hand_sign in column C
          result = "hand_sign Written on column C";
          break;
        case "accuracy":
          rowData[3] = value; // accuracy in column D
          result += " ,accuracy Written on column D";
          break;
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }
  return ContentService.createTextOutput(result);
}
function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}
