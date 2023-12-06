const SERVERS = {
  MESI_SERVER: "https://test.mesi.ht",
  DHIS2_SERVER: "http://209.160.32.93:8080",
};

const RESOURCES = {
  MESI_SITES: "/MesiExchangeAPI/api/DataExtraction/GetSite",
  MESI_INDICATEURS: "/MesiExchangeAPI/api/DataExtraction/GetIndicateur",
  DHIS2_ORGANISATION_UNITS: "/dhis/api/organisationUnits",
  DHIS2_DATA_ELEMENTS: "/dhis/api/dataElements",
};

const DATABASES = {
  CONN_LIMIT: 10,
  HOST: "159.223.116.31",
  USER: "root",
  PASSWORD: "c0nneXus@",
  DBNAME: "delr_xchange",
};

module.exports = { SERVERS, RESOURCES, DATABASES };
