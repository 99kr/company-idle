import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
	NavigationMenuItem,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useUser from "@/hooks/useUser";
import { Link, Outlet, useLocation } from "react-router-dom";
import { WalletIcon } from "@heroicons/react/24/outline";
import { formatNumber } from "@/lib/utils";

const routes = [
	{ path: "/", name: "Home" },
	{ path: "/buy", name: "Buy Companies" },
	{ path: "/upgrade", name: "Upgrade Companies" },
];

export default function Layout() {
	const location = useLocation();
	const user = useUser();

	return (
		<div className="space-y-6">
			<NavigationMenu className="!max-w-full justify-between">
				<NavigationMenuList>
					{routes.map((route) => (
						<NavigationMenuItem key={route.name}>
							<NavigationMenuLink
								active={location.pathname === route.path}
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link to={route.path}>{route.name}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>

				{user && (
					<div className="border px-4 py-2 rounded-md flex gap-3 items-center">
						<WalletIcon className="text-neutral-400 h-5 w-5" />
						<p className="text-neutral-50 font-medium text-sm">${formatNumber(user.balance)}</p>
					</div>
				)}
			</NavigationMenu>

			<Outlet />
		</div>
	);
}
