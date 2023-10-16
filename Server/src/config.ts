import sqlite3 from "sqlite3";

export interface metrics {
	campaignName: string;
	impressions: number;
	clicks: number;
	conversions: number;
	spend: number;
}
const sqlite = sqlite3.verbose()
const db = new sqlite.Database("/Server/db.db", error=>{
    if (error) throw error.message

    console.log("Connected to the SQLite database.")
})

db.run(`CREATE TABLE IF NOT EXISTS Metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campaignName VARCHAR(100)
      impressions INTEGER
      clicks INTEGER
      conversions INTEGER
      spend INTEGER
    `)
    const Close = ()=>{
        db.close((error)=>{
            if (error) throw error.message
            console.log("Close the database connection.")
        })
    }

// SQLite Initialization and Data Binding
async function initializeSQLite() {
	// const db = await open({
	// 	filename: "Sales.sqlite",
	// 	driver: sqlite3.Database,
	// });

	// await db.exec(`
    // CREATE TABLE IF NOT EXISTS Metrics (
    //   id INTEGER PRIMARY KEY AUTOINCREMENT,
    //   campaignName VARCHAR(100)
    //   impressions INTEGER
    //   clicks INTEGER
    //   conversions INTEGER
    //   spend INTEGER
    // )
//   `);

	return db;
}

// API endpoint to interact with SQLite
const getMetrics = async () => {
	const db = await initializeSQLite();
	const users = await db.all("SELECT * FROM Metrics ");
	return 
};

const getMetricsById = async (id: number ) => {
	try {
		const db = await initializeSQLite();
		const metric = await db.all("SELECT * FROM Metrics WHERE id = ?", id);
		return metric;
	} catch (error) {
		throw new Error("an error Occured");
	}
};

const postMetric = async (req: metrics) => {
	try {
		const db = await initializeSQLite();
		const { campaignName, impressions, clicks, conversions, spend } = req;
		const result = await db.run(
			`INSERT INTO Metrics (campaignName, impressions, clicks, conversions, spend) VALUES (?,?,?,?,?)`,
			campaignName,
			impressions,
			clicks,
			conversions,
			spend
		);
		return result;
	} catch (error) {
		throw new Error("an error Occured");
	}
};
