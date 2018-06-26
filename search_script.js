const pg = require("pg");
const settings = require("./settings"); //settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.host,
  port: settings.port,
  ssl: settings.ssl
});

const user_input = process.argv[2];

client.connect(err => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching ...");

  client.query(
    `SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1`,
    [user_input],
    (err, result) => {
      if (err) {
        return console.log("error running query", err);
      }
      console.log(
        `Found ${result.rows.length} person(s) by the name '${user_input}':`
      );
      result.rows.forEach(row => {
        console.log(
          `- ${row.id}: ${row.first_name} ${row.last_name}, born '${
            row.birthdate
          }'`
        );
      });
      client.end();
    }
  );
});
