import Card from "@/components/Card";
import { chapter } from "@/data/chapter";
const page = () => {
  return (
    <>
      {chapter.map((item, index) => (
        <Card
          to={`${item.chapter}`}
          color="bg-list1"
          text={"text-white"}
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
