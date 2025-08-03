const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: `${process.env.PSQL_USER}`,
  password: `${encodeURIComponent(process.env.PSQL_PASS)}`,
  database: "file_uploader",
  port: 5432,
});
