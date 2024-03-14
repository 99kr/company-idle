import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { CompanyType } from "@/data/companies";
import { useCompanyStore } from "@/stores/company-store";
import { useEffect, useRef } from "react";

export default function Home() {
	const companyStore = useCompanyStore();
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

	return (
		<>
			<h1 className="text-3xl font-semibold mb-8">Your Companies</h1>
			<div className="grid grid-cols-6 items-start">
				<div className="grid grid-cols-2 gap-8 col-span-3">
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

							<CardFooter className="w-full justify-self-end">
								<div className="overflow-hidden w-full bg-border rounded-full h-1.5">
									<div
										ref={(el) => {
											companyPercentageRefs.current.set(company.type, el!);
										}}
										className="bg-purple-900 h-full"
										style={{ width: "0%" }}
									/>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>

				<div className="col-start-5 col-span-2 rounded-lg sticky top-4">
					<h1>${companyStore.revenuePerSec}/sec</h1>
				</div>
			</div>
		</>
	);
}
