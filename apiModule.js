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

router.get("/api/dataElements", (request, response) => {
  const query =
    "SELECT Id,Nom,Statut FROM dhis2_data_element WHERE Statut ='ACTIF'";

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results);
  });
});

router.get("/api/categoryOptionCombos", (request, response) => {
  const query =
    "SELECT Id,Nom,Statut FROM dhis2_category_option_combo WHERE Statut ='ACTIF'";

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results);
  });
});

router.get("/api/dataSet", (request, response) => {
  const query =
    "SELECT KeyValue AS DataSetId FROM configuration WHERE VKey ='TO_DATASET1' AND  Statut ='ACTIF'";

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results[0] ? results[0] : { DataSetId: "" });
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

router.post("/api/mapping/site", (request, response) => {
  const mappingData = request.body.mappingData;
  const userId = request.body.userId;
  const query =
    "SELECT InsertSiteMappingData('" +
    JSON.stringify(mappingData) +
    "','" +
    userId +
    "') AS RESULT";

  //console.log(query);

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      response.status(400).send(results);
    } else {
      response.status(200).send(results);
    }
  });
});

router.get("/api/mapping/indicateur", (request, response) => {
  const query =
    "SELECT a.Id AS MESI_ID,a.NomIndicateur AS MESI_NOM, IFNULL(b.IdDHIS2,0) AS DHIS2_ID, IFNULL(c.Nom,'') AS DHIS2_NOM, IFNULL(b.IdCategoryDHIS2,0) AS  DHIS2_CATEGORY_ID ,IFNULL(d.Nom,'') AS DHIS2_CATEGORY FROM mesi_indicateur a  LEFT JOIN mapping_indicateur b ON a.Id = b.IdMesi AND a.Statut = 'ACTIF' LEFT JOIN dhis2_data_element c ON b.IdDHIS2 =c.Id LEFT JOIN dhis2_category_option_combo d ON b.IdCategoryDHIS2 = d.Id AND d.Statut ='ACTIF'";
  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results);
  });
});

router.post("/api/mapping/indicateur", (request, response) => {
  const mappingData = request.body.mappingData;
  const userId = request.body.userId;
  const query =
    "SELECT InsertIndicatorMappingData('" +
    JSON.stringify(mappingData) +
    "','" +
    userId +
    "') AS RESULT";

  //console.log(query);

  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      response.status(400).send(results);
    } else {
      response.status(200).send(results);
    }
  });
});

router.get("/api/utilisateurs", (request, response) => {
  const query =
    "SELECT a.Id AS UtilisateurId,a.Role,a.Nom,Prenom,a.NomUtilisateur,a.Statut,a.DepartementId,b.NomDepartement FROM utilisateur a JOIN departement b ON a.DepartementId = b.Id WHERE a.Statut <> 'SUPPRIME' ORDER BY a.Id DESC ";
  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    response.status(200).send(results);
  });
});

router.post("/api/utilisateurs", (request, response) => {
  const userData = request.body.data;
  const userId = request.body.userId;

  const query =
    "SELECT webapp_crud_utilisateur('" +
    JSON.stringify(userData) +
    "','" +
    userId +
    "','create') AS RESULT";
  console.log(query);
  db.query(query, function (error, results) {
    if (error) {
      helper.Logger(error.message);
      console.log(error.message);
      return;
    }
    results = results[0].RESULT;
    results = JSON.parse(results);
    response.status(200).send(results);
  });
});

router.get("/api/departements", (request, response) => {
  const query =
    "SELECT Id,NomDepartement FROM departement WHERE Statut='ACTIF'";
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
