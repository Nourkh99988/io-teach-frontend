import Clients from "@/components/Clients/Clients";
import Footer from "@/components/Footer/Footer";
import HeadBG from "@/components/HeadBG/HeadBG";
import Navbar from "@/components/Navbar/Navbar";
import Slider from "@/components/Slider/Slider";
import Team from "@/components/Team/Team";
// import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-primarycolor">
        <section className="relative w-full h-screen bg-gradient-to-l from-[#4b2615]/30 to-[#4b2615]/70">
          <HeadBG />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 mx-auto ">
            <Slider />
          </div>
        </section>
        <section className="mt-16">
          <Team />
        </section>
        <section>
          <Clients />
        </section>
        <Footer />
      </main>
    </>
  );
}
