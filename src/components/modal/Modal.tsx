import { useModalStore } from "@/store/useModalStore";
import React from "react";
import "react-h5-audio-player/lib/styles.css";
import StorybookContent from "./StorybookContent";
import DictionaryContent from "./DictionaryContent";
import CompleteTheWords from "./CompleteTheWords";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Notif from "./Notif";

const Modal = () => {
  const { onClose, type,message,status } = useModalStore();

  let content: React.ReactNode = null;
  switch (type) {
    case "storybook":
      content = <StorybookContent />; // ✅ Assigning the component to content
      break;
    case "dictionary":
      content = <DictionaryContent/>; // Add proper content here
      break;
    case "complete":
      content = <CompleteTheWords/>; // Add proper content here
      break;
    case "link":
      content = <div>Game link</div>; // Add proper content here
      break;
    case "which":
      content = <div>Game which</div>; // Add proper content here
      break;
    case "notif":
      content = <Notif/>
      break;
    default:
      content = <div>Default Content</div>; // Optional default content
      break;
  }

  return (
    <div
      onClick={onClose}
      className="fixed h-screen w-screen flex justify-center items-center xl:p-0 p-2 bg-black bg-opacity-50 z-50"
    >
      <div  className=" w-full">
      <DndProvider backend={HTML5Backend}>
        {content}
    </DndProvider>
      </div>
    </div>
  );
};

export default Modal;
