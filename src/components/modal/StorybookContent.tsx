import { chapter } from "@/data/chapter";
import { useModalStore } from "@/store/useModalStore";
import React from "react";
import H5AudioPlayer from "react-h5-audio-player";

const StorybookContent = () => {
  const { id } = useModalStore();
  const filteredAudio = chapter.find((item) => item.chapter === id);
  return (
    <main
      onClick={(e) => e.stopPropagation()}
      className="p-4 bg-white2 space-y-2 max-w-3xl mx-auto rounded-md"
    >
      <h1 className="text-2xl font-semibold">{filteredAudio?.title}</h1>
      <H5AudioPlayer style={{ width: "100%" }} src={filteredAudio?.audio} />
    </main>
  );
};

export default StorybookContent;
