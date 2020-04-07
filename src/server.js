/* eslint-disable no-console */
const app = require("./app");
const { NODE_ENV, PORT } = require("./config");
const knex = require("knex");

let db = knex({
  client: "pg",
  connection: process.env.DB_URL,
});
app.set("db", db);

app.listen(PORT, () =>
  console.log(
    `Server listening in ${NODE_ENV} mode at http://localhost:${PORT}`
  )
);
