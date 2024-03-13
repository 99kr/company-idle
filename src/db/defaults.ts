import { database } from "@/db";

export default async function defaults() {
	const db = await database();

	await db.execute("CREATE TABLE IF NOT EXISTS owned_companies (business TEXT PRIMARY KEY)");
	await db.execute("CREATE TABLE IF NOT EXISTS user (balance INTEGER)");
	await db.execute("INSERT OR IGNORE INTO user (balance) VALUES (100)");

	db.close();
}
