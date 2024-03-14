import { Company, CompanyType } from "@/data/companies";
import { db } from "@/db";
import { create } from "zustand";

type CompanyStore = {
	companies: Company[];
	revenuePerSec: number;

	setRevenue: (totalRevenue: number) => void;

	setCompanies: (companies: Company[]) => void;
	addCompany: (company: Company) => void;

	setLastPayout: (company: CompanyType, time: number) => void;
};

export const useCompanyStore = create<CompanyStore>((set) => ({
	companies: [],
	revenuePerSec: 0,

	setRevenue: (revenuePerSec) => set({ revenuePerSec }),

	setCompanies: (companies) =>
		// calculate total revenue per second using company revenue and time
		set({
			companies: companies.map((company) => ({ ...company, lastPayout: Date.now() })),
			revenuePerSec: companies.reduce((acc, company) => acc + (company.revenue / company.time) * 1000, 0),
		}),

	addCompany: (company) => {
		set((state) => ({
			companies: [...state.companies, { ...company, lastPayout: Date.now() }],
			revenuePerSec: state.revenuePerSec + (company.revenue / company.time) * 1000,
		}));

		addCompany(company);
	},

	setLastPayout: (type, time) => {
		set((state) => ({
			companies: state.companies.map((c) => (c.type === type ? { ...c, lastPayout: time } : c)),
		}));
	},
}));

async function addCompany(company: Company) {
	await db.execute("INSERT INTO owned_companies (business) VALUES ($1)", [company.type]);
}
