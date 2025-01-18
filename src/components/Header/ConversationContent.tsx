import Image from "next/image";
import React from "react";
import ImgLeft from "@/assets/conversation-hero-left.png";
import ImgRight from "@/assets/conversation-hero-right.png";
const ConversationContent = () => {
  return (
    <>
      <Image
        src={ImgLeft}
        alt="img"
        className="absolute right-4 w-52 lg:w-72 lg:top-auto -top-full lg:translate-y-0 -translate-y-1/4  "
        draggable={false}
      />
      <Image
        src={ImgRight}
        alt="img"
        className="absolute left-4 w-52 lg:w-72  lg:top-auto top-full lg:translate-y-0 translate-y-1/4"
        draggable={false}
      />
      <div className="text-primary1 mx-auto space-y-2">
        <h1
          className="lg:text-8xl text-5xl  text-center font-bold"
          style={{ WebkitTextStroke: "2px white" }}
        >
          Conversation
        </h1>
        <p className="lg:text-xl text-center max-w-2xl lg:font-bold">
          Berlatih berbicara bahasa Inggris dengan percakapan interaktif yang
          menyenangkan! Dengarkan, ulangi
        </p>
      </div>
    </>
  );
};

export default ConversationContent;
