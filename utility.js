const utility = function () {
  this.Logger = (data) => {
    var date = new Date();
    data = date.toLocaleString() + ": " + data + "\n";
    const fs = require("fs");
    fs.appendFile("log.txt", data, function (err) {
      if (err) throw error;
    });
  };

  this.CurrentURL = (request) => {
    var url = request.protocol + "://" + request.get("host") + request.url;
    return url;
  };
};

module.exports = { utility };
