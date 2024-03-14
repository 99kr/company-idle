import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { CompanyType } from "@/data/companies";
import { formatNumber } from "@/lib/utils";
import { useCompanyStore } from "@/stores/company-store";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Home() {
	const companyStore = useCompanyStore();
	const userStore = useUserStore();
	const companyPercentageRefs = useRef<Map<CompanyType, HTMLDivElement>>(new Map());

	useEffect(() => {
		const interval = setInterval(() => {
			const now = Date.now();

			for (const company of companyStore.companies) {
				if (!company.lastPayout) continue;

				const timeSinceLastPayout = now - company.lastPayout;
				const percentage = (timeSinceLastPayout / company.time) * 100;

				const el = companyPercentageRefs.current.get(company.type);

				if (el) el.style.width = `${percentage}%`;
			}
		}, 10);

		return () => clearInterval(interval);
	}, [companyStore.companies]);

	function collectPayout(type: CompanyType) {
		const company = companyStore.companies.find((c) => c.type === type)!;

		if (!company.payoutPool) return;

		toast.success(
			<>
				Collected <span className="text-green-400 font-semibold">${formatNumber(company.payoutPool)}</span> from{" "}
				{company.title}!
			</>
		);

		userStore.addBalance(company.payoutPool);
		companyStore.resetPayoutPool(company.type);
	}

	return (
		<>
			<h1 className="text-3xl font-semibold mb-8">Your Companies</h1>

			<div className="grid grid-cols-3 gap-8">
				{companyStore.companies.map((company) => (
					<Card key={company.type} className="grid">
						<CardHeader>
							<img
								src={company.img}
								alt={company.title}
								className="w-full h-32 object-cover object-center rounded-lg mb-4"
							/>
							<CardTitle>{company.title}</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-neutral-300">{company.description}</p>
						</CardContent>

						<CardFooter className="w-full justify-self-end flex gap-4">
							<div className="overflow-hidden w-full bg-border rounded-full h-1.5">
								<div
									ref={(el) => {
										companyPercentageRefs.current.set(company.type, el!);
									}}
									className="bg-purple-900 h-full"
									style={{ width: "0%" }}
								/>
							</div>

							{!company.payoutPool ? (
								<Button variant="secondary" disabled>
									Collect
								</Button>
							) : (
								<Button onClick={() => collectPayout(company.type)}>
									Collect ${formatNumber(company.payoutPool)}
								</Button>
							)}
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}
