import { database } from "@/db";
import { create } from "zustand";

type CompanyStore = {
	companies: {
		type: string;
		title: string;
		img: string;
		description: string;
		revenue: number;
	}[];
	totalRevenue: number;

	setTotalRevenue: (totalRevenue: number) => void;

	setCompanies: (companies: CompanyStore["companies"]) => void;
	addCompany: (company: CompanyStore["companies"][number]) => void;
};

export const useCompanyStore = create<CompanyStore>((set) => ({
	companies: [],
	totalRevenue: 0,

	setTotalRevenue: (totalRevenue) => set({ totalRevenue }),

	setCompanies: (companies) =>
		set({ companies, totalRevenue: companies.reduce((acc, company) => acc + company.revenue, 0) }),

	addCompany: (company) => {
		set((state) => ({
			companies: [...state.companies, company],
			totalRevenue: state.totalRevenue + company.revenue,
		}));

		addCompany(company);
	},
}));

async function addCompany(company: CompanyStore["companies"][number]) {
	const db = await database();

	await db.execute("INSERT INTO owned_companies (business) VALUES ($1)", [company.type]);
}
