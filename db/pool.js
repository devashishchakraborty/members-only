import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export default new Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432, // The default port
  ssl: {
    require: true,
  },
});
