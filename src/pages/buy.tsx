import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Company, companies } from "@/data/companies";
import { cn, formatNumber } from "@/lib/utils";
import { useCompanyStore } from "@/stores/company-store";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export default function Buy() {
	const companyStore = useCompanyStore();
	const userStore = useUserStore();

	const handleBuy = (company: Company) => {
		if (userStore.balance < company.cost)
			return toast.error("Not enough money", {
				description: (
					<>
						You need <b>${formatNumber(company.cost - userStore.balance)}</b> more to buy this company.
					</>
				),
			});

		companyStore.addCompany(company);
		userStore.removeBalance(company.cost);
	};

	return (
		<div className="grid grid-cols-3 gap-8">
			<AnimatePresence mode="popLayout">
				{companies.map((company) => {
					const isOwned = companyStore.companies.some((c) => c.type === company.type);
					const isAffordable = userStore.balance >= company.cost;

					if (isOwned) return null;

					return (
						<motion.div
							key={company.type}
							layout
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							className="h-full"
						>
							<Card key={company.type} className={cn("grid h-full", isOwned && "opacity-50")}>
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
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
}
