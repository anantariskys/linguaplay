import Decoration from "@/assets/landing-decoration.png";
import WelcomeIMG from "@/assets/welcome-image.png";
import FiturIMG from "@/assets/fitur.png";
import TextureBG from "@/assets/texture-bg.png";
import HeroRightIMG from "@/assets/hero-right.png";
import HeroLeftIMG from "@/assets/hero-left.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { fitur } from "@/data/fitur";

const getCardColor = (index: number) => {
  switch (index) {
    case 0:
      return "bg-list1";
      break;
    case 1:
      return "bg-list2";
      break;
    case 2:
      return "bg-list3";
      break;
    case 3:
      return "bg-list4";
      break;
    default:
      break;
  }
};
export default function Home() {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${TextureBG.src})` }}
        className="flex bg-white justify-center items-center flex-col "
      >
        <main className="flex  justify-center relative items-center flex-col gap-3 min-h-screen container">
          <h1 className="text-4xl lg:text-6xl font-bold">LinguaPlay.</h1>
          <h2 className="text-4xl text-center lg:text-6xl font-bold">Learn English, Playfully</h2>
          <p className="max-w-2xl  md:text-xl text-center">
            Haiii Selamat datang!! Tingkatkan kemampuan mendengar, berbicara,
            dan membaca dengan fitur interaktif
          </p>
          <button className="px-8  text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1">
            Mulai belajar
          </button>
          <Image
            src={HeroRightIMG}
            alt="hero"
            className="absolute lg:bottom-8 bottom-4 right-6 lg:w-auto w-20 lg:right-12"
            draggable={false}
          />
          <Image
            src={HeroLeftIMG}
            alt="hero"
            className="absolute bottom-4 lg:bottom-8 lg:w-auto w-20 left-6 lg:left-12"
            draggable={false}
          />
        </main>
      </section>
      <section className="container py-8">
        <Image
          src={FiturIMG}
          alt="fitur"
          className="mx-auto"
          draggable={false}
        />
        <p className="text-center max-w-4xl text-lg mx-auto">
          Ingin belajar apa hari ini? pilih sesuai keinginan mu.. Temukan cerita
          seru dan kata-kata baru untuk melatih kemampuan bahasa Inggris dengan
          cara yang menyenangkan.
        </p>
        <main className="grid lg:grid-cols-4 grid-cols-1 gap-4 py-8">
          {fitur.map((item, index) => (
            <div
              key={index}
              className={`${getCardColor(
                index
              )} p-6 rounded-2xl flex flex-col justify-between gap-2`}
            >
              <div className="flex items-center gap-2 justify-between">
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <div className="bg-white2 min-w-10 aspect-square flex items-center justify-center p-2 rounded-full">
                  <Icon icon={"maki:arrow"} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text">{item.description}</p>
                <Image
                  src={item.image}
                  alt="fitur"
                  className="w-full aspect-square"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </main>
      </section>
      <section className="bg-primary1 relative">
        <h2 className="bg-white2 text-3xl lg:text-5xl font-bold text-center pb-4">
          Selamat Belajar!!!
        </h2>
        <Image
          src={Decoration}
          alt="decoration"
          className="w-full "
          draggable={false}
        />
        <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src={WelcomeIMG}
            alt="welcome"
            className="lg:w-auto w-24"
            draggable={false}
          />
        </main>
      </section>
    </>
  );
}
