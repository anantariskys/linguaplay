import { chapter } from "@/data/chapter";
import { useModalStore } from "@/store/useModalStore";
import React from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Modal = () => {
  const { onClose, id } = useModalStore();

  const filteredAudio = chapter.find((item) => item.chapter === id);
  return (
    <div
      onClick={onClose}
      className="fixed h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-50"
    >
      <main onClick={(e) => e.stopPropagation()} className="p-4 bg-white2 space-y-2 w-2/5 rounded-md">
          <h1 className="text-2xl font-semibold">{filteredAudio?.title}</h1>
          <H5AudioPlayer style={{ width: "100%" }} src={filteredAudio?.audio} />
      </main>
    </div>
  );
};

export default Modal;
