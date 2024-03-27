// Required Modules
const mariadb = require("mariadb");

async function query(serverName, dbName, query) {
    let conn;

    try {
        conn = await mariadb.createConnection({
            host: serverName,
            database: dbName,
            user: "root",
            password: ""
        });

        // Use Connection
        const rows = await conn.query(query);
        // console.log(rows);
        return rows;
    } catch (err) {
        // Manage Errors
        console.log("Database connection failed : ", err);
    } finally {
        // Close Connection
        if (conn) conn.close();
    }
}

module.exports = {
    query
}