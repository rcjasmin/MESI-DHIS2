const cron = require("node-cron");
cron.schedule("*/5 * * * * *", function () {
  /*
  router.get('/api/pos/pari/:entreprise/:banque/:utilisateur/:tirage/:androidid/:pari/:montant/:devise', (request, response) => {
    var data = {"ENTREPRISE_ID":request.params.entreprise, "UTILISATEUR_ID":request.params.utilisateur,   "BANQUE_ID":request.params.banque,
      "TIRAGE_ID":request.params.tirage,"NOMBRE_PARI": request.params.pari, "MONTANT_TOTAL": request.params.montant,
      "ANDROID_ID": request.params.androidid, "DEVISE": request.params.devise};
    var query =  "SELECT pari_POST('"+ JSON.stringify(data) +"','" + util.CurrentURL(request) +"','" + request.ip + "') AS RESULT";
    //console.log(query);
    pool.query(query, function (error, results) {
      if (error) {
        util.Logger(error.message);
        console.log(error.message);
        return; 
      }
      results = results[0].RESULT;
      results = JSON.parse(results);
      response.status(results.HTTP_CODE).send(results);
    });
  });
    */
  console.log("running a task every minute");
});
