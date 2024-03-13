import { CompanyType } from "@/data/companies";
import { database } from "@/db";
import { OwnedCompanies } from "@/models/owned-companies";
import { useEffect, useState } from "react";

export default function useOwnedCompanies() {
	const [ownedCompanies, setOwnedCompanies] = useState<CompanyType[] | null>(null);

	useEffect(() => {
		(async () => {
			const db = await database();
			const companies = await db.select<OwnedCompanies[]>("SELECT * FROM owned_companies");

			setOwnedCompanies(companies.map((company) => company.business as CompanyType));
		})();
	}, []);

	return ownedCompanies;
}
