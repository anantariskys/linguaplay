'use client'
import { useModalStore } from "@/store/useModalStore";
import { Icon } from "@iconify/react/dist/iconify.js";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  id?: number;
  title: string;
  color: "bg-list1" | "bg-list2" | "bg-list3" | "bg-list4";
  description: string;
  image: StaticImageData;
  text?: string;
  to?: string;
}
const Card: FC<Props> = ({
  id,
  color,
  description,
  image,
  title,
  text = "text-black",
  to,
}) => {
  const { onOpen} = useModalStore();
  return (
    <div
      className={`${color} ${text} p-6 rounded-2xl flex flex-col justify-between gap-2`}
    >
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {to && (
          <Link href={to}>
            <div
              className={`bg-white2 ${
                text === "text-white" ? "bg-opacity-30" : "bg-opacity-100"
              } min-w-10 aspect-square flex items-center justify-center p-2 rounded-full`}
            >
              <Icon icon={"maki:arrow"} />
            </div>
          </Link>
        )}
        {id && (
          <div
            onClick={() => onOpen(id,"storybook")}
            className={`bg-white2 ${
              text === "text-white" ? "bg-opacity-30" : "bg-opacity-100"
            } min-w-10 aspect-square flex cursor-pointer items-center justify-center p-2 rounded-full`}
          >
            <Icon icon={"maki:arrow"} />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <p className="text">{description}</p>
        <Image
          src={image}
          alt="fitur"
          className="w-full rounded-xl aspect-square object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Card;
