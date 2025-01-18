'use client'
import Header from "@/components/Header/Header";
import { FC, ReactNode } from "react";

const layout: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <>
    <Header/>
      <section className="py-12 container grid lg:grid-cols-4 gap-4 grid-cols-1">{children}</section>
    </>
  );
};

export default layout;
