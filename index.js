const express = require("express");
const authRoute = require("./routes/auth");
const countryRoute = require("./routes/base_tables/country");
const stateRoute = require("./routes/base_tables/state");
const districtRoute = require("./routes/base_tables/district");
const universityRoute = require("./routes/base_tables/university")
const streamRoute = require("./routes/base_tables/stream");
const roleRouter = require("./routes/role");
require("dotenv").config();

const dbConnection = require("./utils/DBconnection");

const app = express();

app.use(express.json());
app.use(require("cors")());

const routePrefix = "api";

app.use(`/${routePrefix}`, authRoute);
app.use(`/${routePrefix}/countries`, countryRoute);
app.use(`/${routePrefix}/states`, stateRoute);
app.use(`/${routePrefix}/districts`, districtRoute);
app.use(`/${routePrefix}/universities`,universityRoute);
app.use(`/${routePrefix}/streams`,streamRoute);
app.use(`/${routePrefix}/roles`, roleRouter);

app.listen(4000, async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});
