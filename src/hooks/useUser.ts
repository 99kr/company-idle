import { database } from "@/db";
import { User } from "@/models/user";
import { useState, useEffect } from "react";

export default function useOwnedCompanies() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			const db = await database();
			const _user = await db.select<User[]>("SELECT * FROM user LIMIT 1");

			setUser(_user?.[0] ?? null);

			db.close();
		})();
	}, []);

	return user;
}
