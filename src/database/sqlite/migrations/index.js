const sqliteConnection = require("../../sqlite/index");
const createUsers = require("./createUsers");

async function migrationRun() {
  const schemas = [createUsers].join(""); /*JOIN REMOVE OS ESPAÇOS*/
  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

module.exports = migrationRun;
