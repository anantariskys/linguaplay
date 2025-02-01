import { useModalStore } from "@/store/useModalStore";
import React from "react";
import "react-h5-audio-player/lib/styles.css";
import StorybookContent from "./StorybookContent";
import DictionaryContent from "./DictionaryContent";

const Modal = () => {
  const { onClose, type } = useModalStore();

  let content: React.ReactNode = null;
  switch (type) {
    case "storybook":
      content = <StorybookContent />; // ✅ Assigning the component to content
      break;
    case "dictionary":
      content = <DictionaryContent/>; // Add proper content here
      break;
    case "conversation":
      content = <div>Conversation Content</div>; // Add proper content here
      break;
    case "game":
      content = <div>Game Content</div>; // Add proper content here
      break;
    default:
      content = <div>Default Content</div>; // Optional default content
      break;
  }

  return (
    <div
      onClick={onClose}
      className="fixed h-screen w-screen flex justify-center items-center p-2 bg-black bg-opacity-50 z-50"
    >
      <div  className=" w-full">
        {content}
      </div>
    </div>
  );
};

export default Modal;
