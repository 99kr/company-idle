import { Company, CompanyType } from "@/data/companies";
import { db } from "@/db";
import { create } from "zustand";

type CompanyStore = {
	companies: Company[];
	revenuePerSec: number;

	setRevenue: (totalRevenue: number) => void;

	setCompanies: (companies: Company[]) => void;
	addCompany: (company: Company) => void;

	addPayoutPool: (company: CompanyType, amount: number) => void;
	resetPayoutPool: (company: CompanyType) => void;
};

export const useCompanyStore = create<CompanyStore>((set) => ({
	companies: [],
	revenuePerSec: 0,

	setRevenue: (revenuePerSec) => set({ revenuePerSec }),

	setCompanies: (companies) =>
		set({
			companies: companies.map((company) => ({
				...company,
				lastPayout: Date.now(),
			})),
			revenuePerSec: companies.reduce((acc, company) => acc + (company.revenue / company.time) * 1000, 0),
		}),

	addCompany: (company) => {
		set((state) => ({
			companies: [...state.companies, { ...company, lastPayout: Date.now(), payoutPool: 0 }],
			revenuePerSec: state.revenuePerSec + (company.revenue / company.time) * 1000,
		}));

		addCompany(company);
	},

	addPayoutPool: (type, amount) => {
		set((state) => ({
			companies: state.companies.map((c) =>
				c.type === type ? { ...c, payoutPool: (c.payoutPool ?? 0) + amount, lastPayout: Date.now() } : c
			),
		}));

		addPayoutPool(type, amount);
	},

	resetPayoutPool: (type) => {
		set((state) => ({
			companies: state.companies.map((c) => (c.type === type ? { ...c, payoutPool: 0 } : c)),
		}));

		setPayoutPool(type, 0);
	},
}));

async function addCompany(company: Company) {
	await db.execute("INSERT INTO owned_companies (business) VALUES ($1)", [company.type]);
}

async function setPayoutPool(company: CompanyType, amount: number) {
	await db.execute("UPDATE owned_companies SET payout_pool = $1 WHERE business = $2", [amount, company]);
}

async function addPayoutPool(company: CompanyType, amount: number) {
	await db.execute("UPDATE owned_companies SET payout_pool = payout_pool + $1 WHERE business = $2", [
		amount,
		company,
	]);
}
