import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("./posts.sqlite");

// db.exec(`
//   CREATE TABLE IF NOT EXISTS posts (
//     id              INTEGER PRIMARY KEY,
//     userId         INTEGER,
//     createdAt      INTEGER,
//     title      VARCHAR(20),
//     content      VARCHAR(50)
//   );
// `);