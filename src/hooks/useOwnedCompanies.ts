import { CompanyType } from "@/data/companies";
import { database } from "@/db";
import { useEffect, useState } from "react";

export default function useOwnedCompanies() {
	const [ownedCompanies, setOwnedCompanies] = useState<CompanyType[] | null>(null);

	useEffect(() => {
		(async () => {
			const db = await database();
			const companies = await db.select<{ business: string }[]>("SELECT * FROM owned_companies");

			setOwnedCompanies(companies.map((company) => company.business as CompanyType));

			db.close();
		})();
	}, []);

	return ownedCompanies;
}
