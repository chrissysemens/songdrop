import { create } from 'zustand';
import { ReactNode } from 'react';

type SheetOptions = {
	content: ReactNode | undefined;
	isOpen: boolean;
};
type InteractionsState = {
	sheet: SheetOptions;
	openSheet: (sheet: SheetOptions) => void;
	setSheetContent: (content: ReactNode) => void;
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
	setSheetContent: (content: ReactNode) => set((state) => ({ sheet: {...state.sheet, content }})),
	closeSheet: () =>
		set(() => ({ sheet: emptySheet })),
}));
