export type CompanyType = "lemonade-stand" | "newspaper" | "car-wash" | "pizza-delivery" | "donut-shop";

export type Company = {
	type: CompanyType;
	title: string;
	description: string;
	img: string;
	cost: number;
	revenue: number;
	time: number;
	lastPayout?: number;
	payoutPool?: number;
};

export const companies: Company[] = [
	{
		type: "lemonade-stand",
		title: "Lemonade Stand",
		description: "Stand on the street and sell Lemonade",
		img: "/companies/lemonade-stand.jpg",
		cost: 100,
		revenue: 2,
		time: 1000,
	},
	{
		type: "newspaper",
		title: "Newspaper Delivery",
		description: "Work for a popular newssite and deliver their newspapers",
		img: "/companies/newspaper.jpg",
		cost: 200,
		revenue: 60,
		time: 5000,
	},
	{
		type: "car-wash",
		title: "Car Wash",
		description: "Offer people to wash their car for them",
		img: "/companies/car-wash.jpg",
		cost: 720,
		revenue: 540,
		time: 10000,
	},
	{
		type: "pizza-delivery",
		title: "Pizza Delivery",
		description: "Work for a local pizzeria and deliver their orders for them",
		img: "/companies/pizza-delivery.jpg",
		cost: 8640,
		revenue: 12960,
		time: 20000,
	},
	{
		type: "donut-shop",
		title: "Donut Shop",
		description: "Start your all own donut shop",
		img: "/companies/donut-shop.jpg",
		cost: 103680,
		revenue: 207360,
		time: 30000,
	},
];
