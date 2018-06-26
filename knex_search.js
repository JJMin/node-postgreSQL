const pg = require("pg");
const moment = require("moment");
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

const user_input = process.argv[2];

knex("famous_people")
  .select("*")
  .where("first_name", user_input)
  .orWhere("last_name", user_input)
  .asCallback((err, result) => {
    if (err) {
      return console.log("error running query", err);
    }

    console.log("Searching ...");

    console.log(
      `Found ${result.length} person(s) by the name '${user_input}':`
    );

    result.forEach(row => {
      console.log(
        `- ${row.id}: ${row.first_name} ${row.last_name}, born '${moment(
          row.birthdate
        ).format("YYYY-MM-DD")}'`
      );
    });
  })
  .finally(function() {
    knex.destroy();
  })
  .catch(function(error) {
    console.error(error);
  });
