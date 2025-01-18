import Image from "next/image";
import Logo from "@/assets/logo2.svg";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="w-full text-white bg-primary1">
      <main className="container pt-8 pb-4">
        <Image src={Logo} alt="logo" className="w-60" draggable={false} />
        <div className="flex pt-4 pb-8">
          <div className="w-1/2">
            <p className="max-w-sm text-lg">
              Platform pembelajaran bahasa Inggris interaktif untuk anak-anak
            </p>
          </div>
          <div className="flex flex-col text-lg gap-1">
            <h2 className="font-semibold text-xl">LinguaPlay</h2>
            <Link href={"/storybook"}>Audio Narasi</Link>
            <Link href={"/dictionary"}>Mini Dictionary</Link>
            <Link href={"/conversation"}>Conversation</Link>
            <Link href={"/game"}>Game </Link>
          </div>
        </div>
        <hr className="border border-white border-opacity-50"/>
        <p  className="text-center mt-4">© 2025 Lingua Play</p>
      </main>
    </footer>
  );
};

export default Footer;
