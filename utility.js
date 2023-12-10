const fs = require("fs");
const Logger = function (data) {
  var date = new Date();
  data = date.toLocaleString() + ": " + data + "\n";
  fs.appendFile("log.txt", data, function (err) {
    if (err) throw error;
  });
};

const removeNewlinesFromJSON = function removeNewlinesFromJSON(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);

    for (let key in jsonObj) {
      if (typeof jsonObj[key] === "string") {
        jsonObj[key] = jsonObj[key].replace(/\n\n/g, "");
        jsonObj[key] = jsonObj[key].replace(/\n/g, "");
      }
    }
    return JSON.stringify(jsonObj);
  } catch (error) {
    console.error("Invalid JSON string provided:", error);
    return null; // or return jsonString to return original string in case of error
  }
};

module.exports = { Logger, removeNewlinesFromJSON };
