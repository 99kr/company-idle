import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import defaults from "@/db/defaults";
import { useUserStore } from "@/stores/user-store";
import { useCompanyStore } from "@/stores/company-store";
import { companies } from "@/data/companies";
import { OwnedCompanies } from "@/models/owned-companies";
import { User } from "@/models/user";
import { db } from "@/db";

const intervals = new Map<string, NodeJS.Timeout>();

(async () => {
	await defaults();

	const ownedCompanies = await db.select<OwnedCompanies[]>("SELECT business FROM owned_companies");
	const user = await db.select<User[]>("SELECT balance FROM user WHERE id = 1 LIMIT 1");

	const userStore = useUserStore.getState();
	const companyStore = useCompanyStore.getState();

	userStore.setBalance(user[0].balance);

	const _companies = ownedCompanies.map((company) => companies.find((c) => c.type === company.business)!);

	useCompanyStore.subscribe((state) => {
		for (const company of state.companies) {
			if (intervals.has(company.type)) continue;

			intervals.set(
				company.type,
				setInterval(() => {
					userStore.addBalance(company.revenue);
					companyStore.setLastPayout(company.type, Date.now());
				}, company.time)
			);
		}
	});

	companyStore.setCompanies(_companies);
})();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
