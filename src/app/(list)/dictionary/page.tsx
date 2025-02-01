'use client'
import Card from "@/components/Card";
import React from "react";
import { chapter } from "@/data/chapter";
import { dictionary } from "@/data/dictionary";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
const page = () => {
  const { onOpen } = useModalStore();
  return (
    <>
      {dictionary.map((item, index) => (
       <div key={index} onClick={() => onOpen(item.id,"dictionary")}  className="bg-list2 p-4 rounded-md">
        <h3 className="text-xl font-bold text-white2">
          {index+1}. {item.title}
          </h3>
       </div>

      ))}
    </>
  );
};

export default page;
