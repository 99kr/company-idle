import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Company, companies } from "@/data/companies";
import { cn, formatNumber } from "@/lib/utils";
import { useCompanyStore } from "@/stores/company";
import { useUserStore } from "@/stores/user";

export default function Buy() {
	const companyStore = useCompanyStore();
	const userStore = useUserStore();

	const handleBuy = (company: Company) => {
		if (userStore.balance < company.cost) return;

		companyStore.addCompany(company);
		userStore.removeBalance(company.cost);
	};

	return (
		<div className="grid grid-cols-3 gap-8">
			{companies.map((company) => {
				const isOwned = companyStore.companies.some((c) => c.type === company.type);
				const isAffordable = userStore.balance >= company.cost;

				return (
					<Card key={company.type} className={cn("grid", isOwned && "opacity-50")}>
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
							{isOwned ? (
								<Button variant="secondary" className="w-full" disabled>
									You already own this company
								</Button>
							) : (
								<Button
									variant={isAffordable ? "default" : "secondary"}
									className="w-full"
									onClick={() => handleBuy(company)}
								>
									Buy for ${formatNumber(company.cost)}
								</Button>
							)}
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}
