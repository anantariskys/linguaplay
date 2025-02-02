"use client"
import { games } from "@/data/games";
import { useModalStore } from "@/store/useModalStore";
import React from "react";

const Page = () => {
  const { onOpen } = useModalStore();
  return (
    <>
      {games.map((item, index) => (
        <div
          key={index}
          onClick={() => onOpen(item.id,item.type)}
          className="bg-list4 p-4 rounded-md "
        >
          <h3 className="text-xl font-bold text-white2">
            {index + 1}. {item.title}
          </h3>
        </div>
      ))}
    </>
  );
};

export default Page;
