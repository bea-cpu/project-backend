const mysql = require("mysql2/promise");

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",       
      password: "",      
      database: "waste_management_system" 
    });
    console.log(" DB connected successfully!");
    const [rows] = await connection.query("SELECT 1+1 AS result");
    console.log("Query result:", rows);
    await connection.end();
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

test();
