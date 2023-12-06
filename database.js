import { createPool } from "mysql";
const connection = createPool({
  connectionLimit: 10,
  host: "159.223.116.31",
  user: "root",
  password: "c0nneXus@",
  database: "lottery",
});

export default { connection };
