import { db } from "@/db";

export default async function defaults() {
	await db.execute(
		"CREATE TABLE IF NOT EXISTS owned_companies (business TEXT PRIMARY KEY, payout_pool INTEGER DEFAULT 0)"
	);
	await db.execute("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, balance INTEGER)");
	await db.execute("INSERT OR IGNORE INTO user (id, balance) VALUES (1, 100)");
}
