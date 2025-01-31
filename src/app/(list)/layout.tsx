"use client";
import Header from "@/components/Header/Header";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/useModalStore";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen } = useModalStore();
  return (
    <>
      {isOpen && <Modal />}
      <Header />
      <section className="py-12 container grid lg:grid-cols-4 gap-4 grid-cols-1">
        {children}
      </section>
    </>
  );
};

export default layout;
