
import { create } from "zustand";

export interface ModalState {
    isOpen: boolean;
    type: "storybook"|"dictionary"|"conversation"|"game"|null;
    id:number;
    onOpen: (id: number,type:"storybook"|"dictionary"|"conversation"|"game"|null) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    id:0,
    type: null,
    onOpen: (id,type) => set({ isOpen: true , id :id,type:type }),
    onClose: () => set({ isOpen: false,id:0 ,type: null }),
}));