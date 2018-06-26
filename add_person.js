const pg = require("pg");
const settings = require("./settings"); //settings.json

const knex = require("knex")({
  client: "pg",
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.host,
    port: settings.port,
    ssl: settings.ssl
  },
  searchPath: ["knex", "public"]
});

const param_1 = process.argv[2];
const param_2 = process.argv[3];
const param_3 = process.argv[4];

knex("famous_people")
  .insert([{first_name: param_1, last_name: param_2, birthdate: param_3}])
  .select('*')
  .finally(function () {
    knex.destroy();
  })
  .catch(function (error) {
    console.error(error);
  });
