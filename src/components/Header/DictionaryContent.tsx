import Image from "next/image";
import ImgRight from '@/assets/dictionary-hero-right.png'
import ImgLeft from '@/assets/dictionary-hero-left.png'
const DictionaryContent = () => {
  return (
    <>
    <Image src={ImgLeft} alt="img" className="absolute right-4 w-52 lg:w-72 lg:top-auto -top-full lg:translate-y-0 -translate-y-1/4  " draggable={false}/>
    <Image src={ImgRight} alt="img" className="absolute left-4 w-52 lg:w-72  lg:top-auto top-full lg:translate-y-0 translate-y-1/4" draggable={false}/>
      <div className="text-primary1 mx-auto space-y-2">
        <h1
          className="lg:text-8xl text-6xl font-bold"
          style={{ WebkitTextStroke: "2px white" }}
        >
    Mini Dictionary
        </h1>
        <p className="lg:text-xl text-center lg:font-bold">
        Memperkaya pembendaharaan kata dalam storybook
        </p>
      </div>
    </>
  );
};

export default DictionaryContent;
