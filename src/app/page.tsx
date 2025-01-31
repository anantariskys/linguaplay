'use client'
import Decoration from "@/assets/landing-decoration.png";
import WelcomeIMG from "@/assets/welcome-image.png";
import FiturIMG from "@/assets/fitur.png";
import TextureBG from "@/assets/texture-bg.png";
import HeroRightIMG from "@/assets/hero-right.png";
import HeroLeftIMG from "@/assets/hero-left.png";
import Image from "next/image";
import { fitur } from "@/data/fitur";
import Card from "@/components/Card";
import { getCardColor } from "@/utils/utils";




export default function Home() {

  return (
    <>
   
      <section
        style={{ backgroundImage: `url(${TextureBG.src})` }}
        className="flex bg-white justify-center items-center flex-col "
      >
        <main className="flex  justify-center relative items-center flex-col gap-3 min-h-screen container">
          <h1 className="text-4xl lg:text-6xl font-bold">RaraRiri.</h1>
          <h2 className="text-4xl text-center lg:text-6xl font-bold">
            Learn English, Playfully
          </h2>
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
            
            <Card
       
            to={`${item.url}`}
            key={index}
              color={getCardColor(index)}
              description={item.description}
              image={item.image}
              title={item.title}
            />
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
