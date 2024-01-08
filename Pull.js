const service = require("./apiServices");
const config = require("./app.conf");
const url_mesi_sites = config.SERVERS.MESI_SERVER + config.RESOURCES.MESI_SITES;
const url_mesi_indicateurs =
  config.SERVERS.MESI_SERVER + config.RESOURCES.MESI_INDICATEURS;

service.InsertUpdateVariables(url_mesi_sites, "mesi_crud_site", "Sites");
service.InsertUpdateVariables(
  url_mesi_indicateurs,
  "mesi_crud_indicateur",
  "Indicateurs"
);
service.InsertUpdateOrgUnit();
service.InsertUpdateDataElem();
service.InsertConfiguredDataSetElements();
service.InsertUpdateCategoryOptionCombo();

//const cron = require("node-cron");
//cron.schedule("*/5 * * * * *", function () {
