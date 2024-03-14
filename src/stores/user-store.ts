import { db } from "@/db";
import { formatNumber } from "@/lib/utils";
import { create } from "zustand";

type UserStore = {
	balance: number;

	setBalance: (balance: number) => void;
	addBalance: (amount: number) => void;
	removeBalance: (amount: number) => void;
	displayBalance: () => string;
};

export const useUserStore = create<UserStore>((set, get) => ({
	balance: 100,

	setBalance: (balance: number) => set({ balance }),
	addBalance: (amount: number) => {
		set((state) => ({ balance: state.balance + amount }));
		addBalance(amount);
	},
	removeBalance: (amount: number) => {
		set((state) => ({ balance: state.balance - amount }));
		removeBalance(amount);
	},
	displayBalance: () => formatNumber(get().balance),
}));

async function addBalance(amount: number) {
	await db.execute("UPDATE user SET balance = balance + $1 WHERE id = 1", [amount]);
}

async function removeBalance(amount: number) {
	await db.execute("UPDATE user SET balance = balance - $1 WHERE id = 1", [amount]);
}
