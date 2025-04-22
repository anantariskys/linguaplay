import { useModalStore } from "@/store/useModalStore";
import React from "react";
import "react-h5-audio-player/lib/styles.css";
import StorybookContent from "./StorybookContent";
import DictionaryContent from "./DictionaryContent";
import CompleteTheWords from "./CompleteTheWords";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Notif from "./Notif";
import WhichOne from "./WhichOne";
import LinkTheObject from "./LinkTheObject";
import ConversationContent from "./ConversationContent";

const Modal = () => {
  const { onClose, type} = useModalStore();

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
      content = <LinkTheObject/>; // Add proper content here
      break;
    case "conversation":
      content = <ConversationContent/>; // Add proper content here
      break;
    case "which":
      content = <WhichOne/>; // Add proper content here
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
      <div  className=" w-full p-4">
      <DndProvider backend={HTML5Backend}>
        {content}
    </DndProvider>
      </div>
    </div>
  );
};

export default Modal;
