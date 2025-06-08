import { create } from 'zustand';
import { ReactNode } from 'react';

type SheetOptions = {
	content: ReactNode | undefined;
	isOpen: boolean;
};
type InteractionsState = {
	sheet: SheetOptions;
	openSheet: (sheet: SheetOptions) => void;
	closeSheet: () => void;
};

export const emptySheet: SheetOptions = {
	isOpen: false,
	content: undefined,
};

export const useInteractions = create<InteractionsState>((set) => ({
	sheet: emptySheet,
	openSheet: (sheet: SheetOptions) =>
		set(() => ({ sheet })),
	closeSheet: () =>
		set(() => ({ sheet: emptySheet })),
}));
