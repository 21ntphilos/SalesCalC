// import sqlite3 from "sqlite3";

// export interface metrics {
// 	campaignName: string;
// 	impressions: number;
// 	clicks: number;
// 	conversions: number;
// 	spend: number;
// }
// export const port = 5222
// const sqlite = sqlite3.verbose()
// const db: sqlite3.Database = new sqlite.Database(
// 	"/Users/temi/Documents/GitHub/SalesCalC/Server/db.db",
// 	(error) => {
// 		if (error) throw error.message;

// 		db.run(`CREATE TABLE IF NOT EXISTS Metrics (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           campaignName VARCHAR(100),
//           impressions INTEGER,
//           clicks INTEGER,
//           conversions INTEGER,
//           spend INTEGER,
//         `),
// 			(error: Error) => {
// 				if (error) {
// 					console.log(error.message);
// 					throw error.message;
// 				}
// 			};

// 		console.log("Connected to the SQLite database.");
// 	}
// );


// export const close = ()=>{
//      db.close((error: any)=>{
//         if (error) throw error.message
//         console.log("Close the database connection.")
//     })
// }

// // API endpoint to interact with SQLite
// export const getMetrics = async () => {
	
// 	const metrics = await db.all(
// 		"SELECT * FROM Metrics",
// 		(err: any, data: metrics) => {
// 			if (err) throw err.message;
// 			return data;
// 		}
// 	);
// 	return metrics;
// };

// export const getMetricsById = async (id: number ) => {
// 	try {
// 		const metric = await db.all("SELECT * FROM Metrics WHERE id = ?", id, (err:any, data:metrics)=>{
//             if (err) throw err.message
// 			// close()
//             return data
//         });
// 		return metric;
// 	} catch (error) {
// 		throw new Error("an error Occured");
// 	}
// };

// export const postMetric = async (req: metrics) => {
// 	try {
// 		const { campaignName, impressions, clicks, conversions, spend } = req;
// 		const result = await db.run(
// 			`INSERT INTO Metrics (campaignName, impressions, clicks, conversions, spend) VALUES (?,?,?,?,?)`,
// 			[campaignName,
// 			impressions,
// 			clicks,
// 			conversions,
// 			spend],
// 			(err: Error, data:metrics) => {
// 				if (err) throw err.message;
// 				return data;
// 			}
// 		);
// 		return result;
// 	} catch (error) {
// 		throw new Error("an error Occured");
// 	}
// };


import sqlite3 from "sqlite3";

export interface Metrics {
	id: number;
	campaignName: string;
	impressions: number;
	clicks: number;
	conversions: number;
	spend: number;
}

export const port = 5222;
export const CLIENT = process.env.CLIENT!
const sqlite = sqlite3.verbose();


	const db: sqlite3.Database = new sqlite.Database(
	"/Users/temi/Documents/GitHub/SalesCalC/Server/db.db",
	(error) => {
		if (error) {
			console.error(error.message)
			error.name;
		} else {
			db.run(
				`CREATE TABLE IF NOT EXISTS Metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        campaignName VARCHAR(100) NOT NULL UNIQUE,
        impressions INTEGER NOT NULL,
        clicks INTEGER NOT NULL,
        conversions INTEGER NOT NULL,
        spend INTEGER NOT NULL
      )`,
				(createError: Error) => {
					if (createError) {
						console.error(createError.message);
					} else {
						console.log("Connected to the SQLite database.");
					}
				}
			);
		}
	}
);

// API endpoint to interact with SQLite
export const getMetrics = async (): Promise<Metrics[]> => {
	
	return new Promise<Metrics[]>((resolve, reject) => {
		db.all("SELECT * FROM Metrics", (err: Error | null, data: Metrics[]) => {
			if (err) {
				console.error(err.message);
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

export const getMetricsById = async (id: number): Promise<Metrics[]> => {
	return new Promise<Metrics[]>((resolve, reject) => {
		db.all(
			"SELECT * FROM Metrics WHERE id = ?",
			id,
			(err: Error | null, data: Metrics[]) => {
				if (err) {
					console.error(err.message);
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
};

export const postMetric = async (req: Metrics): Promise<Metrics> => {
	const { campaignName, impressions, clicks, conversions, spend } = req;

	try {
		// Start a transaction
		return await new Promise((resolve, reject) => {
			db.serialize(() => {
				db.run("BEGIN", (beginErr: Error | null) => {
					if (beginErr) {
						console.error(beginErr.message);
						reject(beginErr);
						return;
					}

					// Insert the data into the 'Metrics' table
					db.run(
						"INSERT INTO Metrics (campaignName, impressions, clicks, conversions, spend) VALUES (?,?,?,?,?)",
						[campaignName, impressions, clicks, conversions, spend],
						function (insertErr: Error | null) {
							if (insertErr) {
								console.error(insertErr.message);
								db.run("ROLLBACK"); 
								reject(insertErr);
							} else {
								const lastInsertedId = this.lastID;
								
								db.get(
									"SELECT * FROM Metrics WHERE id = ?",
									lastInsertedId,
									(selectErr: Error | null, rowData: Metrics) => {
										if (selectErr) {
											console.error(selectErr.message);
											db.run("ROLLBACK"); 
											reject(selectErr);
										} else {
											
											db.run("COMMIT", (commitErr: Error | null) => {
												if (commitErr) {
													console.error(commitErr.message);
													reject(commitErr);
												} else {
													resolve(rowData);
													close()
												}
											});
										}
									}
								);
							}
						}
					);
				});
			});
		});
	} catch (error) {
		throw new Error("An error occurred");
	}
};

