
import { create } from "zustand";

export interface ModalState {
    isOpen: boolean;
    id:number;
    onOpen: (id: number) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    id:0,
    onOpen: (id) => set({ isOpen: true , id :id}),
    onClose: () => set({ isOpen: false,id:0 }),
}));