import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import defaults from "@/db/defaults";
import { useUserStore } from "@/stores/user";
import { useCompanyStore } from "@/stores/company";
import { database } from "@/db";
import { companies } from "@/data/companies";
import { OwnedCompanies } from "@/models/owned-companies";
import { User } from "@/models/user";

(async () => {
	await defaults();

	const db = await database();
	const ownedCompanies = await db.select<OwnedCompanies[]>("SELECT business FROM owned_companies");
	const user = await db.select<User[]>("SELECT balance FROM user WHERE id = 1 LIMIT 1");

	useUserStore.getState().setBalance(user[0].balance);

	const _companies = ownedCompanies.map((company) => companies.find((c) => c.type === company.business)!);

	useCompanyStore.getState().setCompanies(_companies);

	let totalRevenue = useCompanyStore.getState().totalRevenue;

	useCompanyStore.subscribe((state) => {
		console.log(state);
		totalRevenue = state.totalRevenue;
	});

	setInterval(() => {
		useUserStore.getState().addBalance(totalRevenue);
	}, 1000);
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
