import Card from "@/components/Card";
import React from "react";
import { chapter } from "@/data/chapter";
const page = () => {
  return (
    <>
      {chapter.map((item, index) => (
        <Card
          to={`${item.chapter}`}
          color="bg-list2"
          description={item.description}
          image={item.image}
          title={item.subtitle}
          key={index}
        />
      ))}
    </>
  );
};

export default page;
