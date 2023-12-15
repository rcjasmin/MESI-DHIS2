const helper = require("./utility");
const db = require("./database");
const express = require("express");
const router = express.Router();

router.get("/api/organisationUnits", (request, response) => {
  const query =
    "SELECT Id,Nom,Statut FROM dhis2_organisation_unit WHERE Statut ='ACTIF'";

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results);
  });
});

router.get("/api/mapping/site", (request, response) => {
  const query =
    "SELECT a.Id AS MESI_ID,a.Nom AS MESI_NOM, IFNULL(b.IdDHIS2,0) AS DHIS2_ID, IFNULL(c.Nom,'') AS DHIS2_NOM  FROM mesi_site a  LEFT JOIN mapping_site b ON a.Id = b.IdMesi LEFT JOIN dhis2_organisation_unit c ON b.IdDHIS2 =c.Id WHERE a.Statut = 'ACTIF' ";
  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results);
  });
});

module.exports = router;
