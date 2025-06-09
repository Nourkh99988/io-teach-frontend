import Clients from "@/components/Clients/Clients";
import Footer from "@/components/Footer/Footer";
import HeadBG from "@/components/HeadBG/HeadBG";
import Slider from "@/components/Slider/Slider";
import Team from "@/components/Team/Team";
import { fetchFromStrapi } from "@/lib/API/fetchApi";
import { endpointUrls } from "@/lib/API/endPoints";
import { SliderResponse } from "@/types/slider";
import { TeamResponse } from "@/types/team";
import { ClientResponse } from "@/types/client";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const responseSlider = await fetchFromStrapi<SliderResponse>(endpointUrls.slidersUrl, locale);
  const sliders = responseSlider?.data || [];
  const responseTeam = await fetchFromStrapi<TeamResponse>(endpointUrls.teamUrl, locale);
  const team = responseTeam?.data || [];
  const responseClients = await fetchFromStrapi<ClientResponse>(endpointUrls.clientsUrl, locale);
  const clients = responseClients?.data || [];

  return (
    <>
      <main className="bg-primarycolor">
        <section className="relative w-full h-screen bg-gradient-to-l from-[#4b2615]/30 to-[#4b2615]/70">
          <HeadBG height="100vh" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 mx-auto ">
            <Slider sliders={sliders} />
          </div>
        </section>
        <section className="mt-16">
          <Team team={team} />
        </section>
        <section>
          <Clients clients={clients} />
        </section>
        <Footer />
      </main>
    </>
  );
}
