
const pg       = require("pg");
      const settings = require("./settings.json");
const knex     = require('knex')({
            client: 'pg',
            connection: {
            user     : settings.user,
            password : settings.password,
            database : settings.database,
            host     : settings.hostname,
            port     : settings.port,
            ssl      : settings.ssl
           }
      });





let input = process.argv[2];
knex.from('famous_people').select("first_name","last_name","birthdate")
  .where('first_name', '=', input)
  .then (rows => {
    console.log(`Searching ...`);
    console.log(`Found ${rows.length} person(s) by the name '${input}': `);
        for (let row of rows) {
          console.log(`- ${rows.indexOf(row) + 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
        }
    })
      .catch((err) => { console.log( err); throw err })
      .finally(() => {
        knex.destroy();
       });