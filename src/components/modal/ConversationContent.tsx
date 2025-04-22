import { useModalStore } from "@/store/useModalStore";
import { conversation } from "@/data/convertation";

export default function ConversationContent() {
  const { id } = useModalStore();
  const data = conversation.find((item) => item.id === id);
  return (
    <main
      onClick={(e) => e.stopPropagation()}
      className="max-w-7xl w-full h-fit bg-white2 space-y-2 mx-auto p-4 rounded-2xl mx-auto 
        sm:max-h-[70vh] md:max-h-[80vh] lg:max-h-[85vh] xl:max-h-[90vh] 
        max-h-[60vh] overflow-y-auto"
    >
      <video
        src={`/video/${data?.file_name}`}
        controls
        preload="metadata"
        controlsList="nodownload"
        className="w-full aspect-video object-cover rounded-2xl
          sm:max-w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] mx-auto"
      >
        <source src={`/video/${data?.file_name}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}
