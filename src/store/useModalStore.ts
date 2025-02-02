
import { create } from "zustand";

export interface ModalState {
    isOpen: boolean;
    type: "storybook"|"dictionary"|"complete"|"which"|"link"|"notif"|null;
    id:number;
    message?: string;
    status?:'correct'|'wrong',
    onOpen: (id: number,type:"storybook"|"dictionary"|"complete"|"which"|"link"|"notif"|null,message?:string,status?:'correct'|'wrong') => void;
    onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    id:0,
    message:"",
    status:"wrong",
    type: null,
    onOpen: (id,type,message,status) => set({ isOpen: true , id :id,type:type ,message:message,status:status}),
    onClose: () => set({ isOpen: false,id:0 ,type: null }),
}));