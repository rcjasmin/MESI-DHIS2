const conf = require("./app.conf");
const axios = require("axios");
const helper = require("./utility");
const db = require("./database");

const InsertUpdateVariables = function (apiURL, dbFunction, typeProcess) {
  let total = 0;
  axios
    .get(apiURL)
    .then((response) => {
      total = response.data.length;
      response.data.forEach((element) => {
        let site = JSON.stringify(element).replaceAll("'", " ");
        site = helper.removeNewlinesFromJSON(site);
        const query = "SELECT " + dbFunction + "('" + site + "') AS RESULT";
        db.query(query, function (error, results) {
          if (error) {
            helper.Logger(error.message);
            return;
          }
          //results = results[0].RESULT;
          //results = JSON.parse(results);
          //console.log(results.CODE_MESSAGE);
          //console.log(results.CODE_MESSAGE === "SUCCESS");
          return;
        });
      });

      let message = "Total " + typeProcess + " processed : " + total;
      console.log(message);
      helper.Logger("Date : " + new Date() + "Message: " + message);
    })
    .catch((error) => {
      helper.Logger("Date : " + new Date() + "Message: " + error.message);
      console.log("Exception Message : " + error);
    });
};

//Function to load Organisation Units from DHIS2
const InsertUpdateOrgUnit = function () {
  let total = 0;
  const auth =
    "Basic " +
    btoa(
      conf.DHIS2_CREDENTIALS.DHIS2_CREDENTIALS.USER +
        ":" +
        conf.DHIS2_CREDENTIALS.PASSWORD
    );

  const config = {
    headers: {
      Authorization: auth,
    },
  };
  const url =
    conf.SERVERS.DHIS2_SERVER + conf.RESOURCES.DHIS2_ORGANISATION_UNITS;

  axios
    .get(url, config)
    .then((response) => {
      total = response.data.organisationUnits.length;
      response.data.organisationUnits.forEach((element) => {
        let site = JSON.stringify(element).replaceAll("'", " ");
        site = helper.removeNewlinesFromJSON(site);
        const query =
          "SELECT dhis2_crud_organisation_unit('" + site + "') AS RESULT";
        db.query(query, function (error, results) {
          if (error) {
            helper.Logger(error.message);
            return;
          }
          return;
        });
      });

      let message = "Total Organisation Units processed : " + total;
      console.log(message);
      helper.Logger("Date : " + new Date() + "Message: " + message);
    })
    .catch((error) => {
      helper.Logger("Date : " + new Date() + "Message: " + error.message);
      console.log("Exception Message : " + error);
    });
};

//Function to load Data Elements from DHIS2
const InsertUpdateDataElem = function () {
  let total = 0;
  const auth =
    "Basic " +
    btoa(conf.DHIS2_CREDENTIALS.USER + ":" + conf.DHIS2_CREDENTIALS.PASSWORD);

  const config = {
    headers: {
      Authorization: auth,
    },
  };
  const url = conf.SERVERS.DHIS2_SERVER + conf.RESOURCES.DHIS2_DATA_ELEMENTS;

  axios
    .get(url, config)
    .then((response) => {
      total = response.data.dataElements.length;
      response.data.dataElements.forEach((element) => {
        let site = JSON.stringify(element).replaceAll("'", " ");
        site = helper.removeNewlinesFromJSON(site);
        const query =
          "SELECT dhis2_crud_data_element('" + site + "') AS RESULT";
        db.query(query, function (error, results) {
          if (error) {
            helper.Logger(error.message);
            return;
          }
          return;
        });
      });

      let message = "Total Data Elements processed : " + total;
      console.log(message);
      helper.Logger("Date : " + new Date() + "Message: " + message);
    })
    .catch((error) => {
      helper.Logger("Date : " + new Date() + "Message: " + error.message);
      console.log("Exception Message : " + error);
    });
};

module.exports = {
  InsertUpdateVariables,
  InsertUpdateOrgUnit,
  InsertUpdateDataElem,
};
