import useOwnedCompanies from "@/hooks/useOwnedCompanies";

export default function Home() {
	const ownedCompanies = useOwnedCompanies();

	console.log(ownedCompanies);

	if (ownedCompanies === null) return null;

	return (
		<div>
			{ownedCompanies.length === 0 ? (
				<p>You don't own any companies yet.</p>
			) : (
				<ul>
					{ownedCompanies.map((company) => (
						<li key={company}>{company}</li>
					))}
				</ul>
			)}
		</div>
	);
}
