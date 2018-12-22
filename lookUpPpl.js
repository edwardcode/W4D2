const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  let input = process.argv[2];
  if (err) {
    return console.error("Connection Error", err);
  } else {
    function lookup_ppl(input, callback) {

      client.query(`
        SELECT *
          FROM famous_people
          WHERE first_name = $1::text`, [input], (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result.rows)
            }
            client.end();
      });
    }

    lookup_ppl(input, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Searching ...`);
        console.log(`Found ${data.length} person(s) by the name '${input}': `);
        for (let item of data) {
          console.log(`- ${data.indexOf(item) + 1}: ${item.first_name} ${item.last_name}, born '${item.birthdate}'`);
        }
      }
    })
  }
});