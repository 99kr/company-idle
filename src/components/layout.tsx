import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
	NavigationMenuItem,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CircleStackIcon, HomeIcon, ChartPieIcon, WalletIcon } from "@heroicons/react/24/outline";
import {
	CircleStackIcon as CircleStackIconSolid,
	HomeIcon as HomeIconSolid,
	ChartPieIcon as ChartPieIconSolid,
} from "@heroicons/react/24/solid";
import { useUserStore } from "@/stores/user-store";
import { Toaster } from "@/components/ui/sonner";

const routes = [
	{ path: "/", name: "Home", icon: { outline: HomeIcon, solid: HomeIconSolid } },
	{
		path: "/buy",
		name: "Buy Companies",
		icon: { outline: CircleStackIcon, solid: CircleStackIconSolid },
	},
	{
		path: "/stats",
		name: "Stats",
		icon: { outline: ChartPieIcon, solid: ChartPieIconSolid },
	},
];

export default function Layout() {
	const location = useLocation();
	const userStore = useUserStore();

	return (
		<div>
			<NavigationMenu className="!max-w-full justify-between sticky top-0 backdrop-blur py-4 bg-background/95">
				<NavigationMenuList>
					{routes.map((route) => {
						const active = location.pathname === route.path;

						return (
							<NavigationMenuItem key={route.name}>
								<NavigationMenuLink active={active} asChild className={navigationMenuTriggerStyle()}>
									<Link to={route.path}>
										{active ? (
											<route.icon.solid className="w-5 h-5 text-neutral-400 mr-2" />
										) : (
											<route.icon.outline className="w-5 h-5 text-neutral-400 mr-2" />
										)}
										{route.name}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						);
					})}
				</NavigationMenuList>

				<div className="border px-4 py-2 rounded-md flex gap-3 items-center">
					<WalletIcon className="text-neutral-400 h-5 w-5" />
					<p className="text-neutral-50 font-medium text-sm">${userStore.displayBalance()}</p>
				</div>
			</NavigationMenu>

			<div className="mt-4">
				<Outlet />
			</div>

			<Toaster />
		</div>
	);
}
