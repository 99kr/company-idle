import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { companies } from "@/data/companies";
import useOwnedCompanies from "@/hooks/useOwnedCompanies";
import { cn, formatNumber } from "@/lib/utils";

export default function Buy() {
	const ownedCompanies = useOwnedCompanies();

	if (!ownedCompanies) return null;

	return (
		<div className="grid grid-cols-3 gap-12">
			{companies.map((company) => {
				const isOwned = ownedCompanies.includes(company.type);
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
								<Button variant="secondary" className="w-full">
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
