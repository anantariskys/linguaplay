'use client'
import React from "react";
import { dictionary } from "@/data/dictionary";
import { useModalStore } from "@/store/useModalStore";
const Page = () => {
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

export default Page;
