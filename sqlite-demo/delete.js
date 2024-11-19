import sqlite3 from "sqlite3";
import { execute } from "./sql.js";

const main = async () => {
  const db = new sqlite3.Database("my.db");
  const sql = `DELETE FROM products WHERE id = ?`;
  try {
    await execute(db, sql, [1]);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};

main();