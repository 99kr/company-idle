import { useCompanyStore } from "@/stores/company";

export default function Home() {
	const companyStore = useCompanyStore();

	return (
		<div>
			<p>Revenue/sec: ${companyStore.totalRevenue}</p>
			{companyStore.companies.length === 0 ? (
				<p>You don't own any companies yet.</p>
			) : (
				<ul>
					{companyStore.companies.map((company) => (
						<li key={company.type}>{company.title}</li>
					))}
				</ul>
			)}
		</div>
	);
}
