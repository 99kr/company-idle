import Database from "tauri-plugin-sql-api";

export const db = await Database.load("sqlite:company-idle.db");
