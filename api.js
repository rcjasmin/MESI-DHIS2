const express = require("express");
const app = new express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.enable("trust proxy");

const apiModuleVar = require("./apiModule");

// Importing route into path /
app.use("/", apiModuleVar);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running ...");
});
