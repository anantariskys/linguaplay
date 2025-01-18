import React from "react";
import HeroIMG from "@/assets/storybook-hero.png";
import Image from "next/image";
const StoryBookContent = () => {
  return (
    <>
      <div className="lg:w-1/2 text-primary1 space-y-2">
        <h1
          className="lg:text-8xl text-6xl font-bold"
          style={{ WebkitTextStroke: "2px white" }}
        >
          Audio Narasi Storybook
        </h1>
        <p className="lg:text-xl lg:font-bold">
          Nikmatin cerita dengan narasi audio interaktif yang melatih kemampuan
          mendengar dan berbicara
        </p>
      </div>
      <Image src={HeroIMG} alt="hero" draggable="false" className="lg:w-2/5" />
    </>
  );
};

export default StoryBookContent;
