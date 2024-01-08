const conf = require("./app.conf");
const axios = require("axios");
const helper = require("./utility");
const db = require("./database");

const auth =
  "Basic " +
  btoa(conf.DHIS2_CREDENTIALS.USER + ":" + conf.DHIS2_CREDENTIALS.PASSWORD);

const config = {
  headers: {
    Authorization: auth,
  },
};
const InsertUpdateVariables = async function (apiURL, dbFunction, typeProcess) {
  let total = 0;
  await axios
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
          return;
        });
      });

      let message = "Number of " + typeProcess + " processed : " + total;
      console.log(new Date().toLocaleString() + " ===> " + message);
      helper.Logger(new Date().toLocaleString() + " ===> " + message);
    })
    .catch((error) => {
      helper.Logger(
        new Date().toLocaleString() + " ===> Message: " + error.message
      );
      console.log("Exception Message : " + error);
    });
};

//Function to load Organisation Units from DHIS2
const InsertUpdateOrgUnit = async function () {
  let total = 0;
  const url =
    conf.SERVERS.DHIS2_SERVER + conf.RESOURCES.DHIS2_ORGANISATION_UNITS;

  await axios
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

      let message = "Number of Organisation Units processed : " + total;
      console.log(new Date().toLocaleString() + " ===> " + message);
      helper.Logger(+new Date().toLocaleString() + " ===> " + message);
    })
    .catch((error) => {
      helper.Logger(
        new Date().toLocaleString() + " ===> Message: " + error.message
      );
      console.log("Exception Message : " + error);
    });
};

//Function to load Data Elements from DHIS2
const InsertUpdateDataElem = async function () {
  let total = 0;
  const url = conf.SERVERS.DHIS2_SERVER + conf.RESOURCES.DHIS2_DATA_ELEMENTS;

  await axios
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

      let message = "Number of Data Elements processed : " + total;
      console.log(new Date().toLocaleString() + " ===> " + message);
      helper.Logger(new Date().toLocaleString() + " ===> " + message);
    })
    .catch((error) => {
      helper.Logger(
        new Date().toLocaleString() + " ===> Message: " + error.message
      );
      console.log("Exception Message : " + error);
    });
};

//Function to load the configured Data Elements from DataSet
const InsertConfiguredDataSetElements = async function () {
  let total = 0;
  const query =
    "SELECT KeyValue AS DataSetId FROM configuration WHERE VKey ='TO_DATASET' AND  Statut ='ACTIF'";

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    const data = results[0];
    if (data) {
      const url =
        conf.SERVERS.DHIS2_SERVER +
        conf.RESOURCES.DHIS2_GET_DATASET_ELEMENTS +
        "/" +
        data.DataSetId;

      axios
        .get(url, config)
        .then((response) => {
          total = response.data.dataSetElements.length;
          const query =
            "SELECT dhis2_Insert_DataSetElement('" +
            JSON.stringify(response.data.dataSetElements) +
            "') AS RESULT";
          //console.log(query);
          db.query(query, function (error, results) {
            if (error) {
              helper.Logger(error.message);
              return;
            }
            return;
          });

          let message =
            "Number of Data Element of the DataSet processed : " + total;
          console.log(new Date().toLocaleString() + " ===> " + message);
          helper.Logger(new Date().toLocaleString() + " ===> " + message);
        })
        .catch((error) => {
          helper.Logger(
            new Date().toLocaleString() + " ===> Message: " + error.message
          );
          console.log("Exception Message : " + error);
        });
    }
  });
};

//Get Category option Combo
//Function to load Data Elements from DHIS2
const InsertUpdateCategoryOptionCombo = async function () {
  let total = 0;
  const url =
    conf.SERVERS.DHIS2_SERVER + conf.RESOURCES.DHIS2_GET_CATEGORY_OPTION_COMBO;

  await axios
    .get(url, config)
    .then((response) => {
      total = response.data.categoryOptionCombos.length;
      response.data.categoryOptionCombos.forEach((element) => {
        let site = JSON.stringify(element).replaceAll("'", " ");
        site = helper.removeNewlinesFromJSON(site);
        const query =
          "SELECT dhis2_crud_CategoryOptionCombo('" + site + "') AS RESULT";
        db.query(query, function (error, results) {
          if (error) {
            helper.Logger(error.message);
            return;
          }
          return;
        });
      });

      let message = "Number of Category Option Combo processed : " + total;
      console.log(new Date().toLocaleString() + " ===> " + message);
      helper.Logger(new Date() + "Message: " + message);
    })
    .catch((error) => {
      helper.Logger(
        new Date().toLocaleString() + " ===> Message: " + error.message
      );
      console.log("Exception Message : " + error);
    });
};

module.exports = {
  InsertUpdateVariables,
  InsertUpdateOrgUnit,
  InsertUpdateDataElem,
  InsertConfiguredDataSetElements,
  InsertUpdateCategoryOptionCombo,
};
