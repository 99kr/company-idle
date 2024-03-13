import Database from "tauri-plugin-sql-api";

export function database() {
	return Database.load("sqlite:company-idle.db");
}
