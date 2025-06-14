"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocale, useTranslations } from "next-intl";
import { TeamMember } from "@/types/team";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { setTeamMembers } from "@/lib/redux/slices/teamslice";

const Team = ({ team }: { team: TeamMember[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const teamMembersStore = useSelector((state: RootState) => state.team.teamMembers);
  const locale = useLocale();
  const t = useTranslations("team");
  const [teamMembersState, setTeamMembersState] = useState<TeamMember[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setTeamMembers(team));
    if (teamMembersStore.length > 0) {
      setTeamMembersState(teamMembersStore);
    } else {
      setTeamMembersState(team);
    }
  }, [team, locale]);

  // useEffect(() => {
  //   const fetchTeamMembers = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team-members?fields[0]=name&fields[1]=postion&populate[photo][populate][image][fields][0]=url&locale=${locale}`,
  //         { cache: "no-store" }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch team members");
  //       }

  //       const data: TeamResponse = await response.json();

  //       setTeamMembers(data.data);
  //       setError(null);
  //     } catch (err) {
  //       console.log(err);
  //       setError(t("fetchError"));
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTeamMembers();
  // }, [locale, t]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  // if (isLoading) {
  //   return (
  //     <section className="py-16 px-4 bg-[#F3F4F6]">
  //       <div className="max-w-7xl mx-auto text-center">
  //         <p className="text-xl text-gray-600">{t("loading")}</p>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className="py-16 px-4 bg-[#F3F4F6]">
  //       <div className="max-w-7xl mx-auto text-center">
  //         <p className="text-xl text-red-600">{error}</p>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="py-16 px-4 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-title  font-bold text-center text-primarycolor mb-4">{t("title")}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-description">{t("subtitle")}</p>
        <label className="custom-team-left-arrow" htmlFor="custom-left-button-for-team-carousel">
          <Image src="/assets/icons/left-arrow.png" alt="Left Arrow" width={40} height={40} />
        </label>
        <label className="custom-team-right-arrow" htmlFor="custom-right-button-for-team-carousel">
          <Image src="/assets/icons/right-arrow.png" alt="Right Arrow" width={40} height={40} />
        </label>
        <Carousel
          responsive={responsive}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all 0.5s ease"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list"
          itemClass="carousel-team-item"
          centerMode={false}
          className="team-carousel"
          infinite={false}
          autoPlay={true}
          customLeftArrow={<button id="custom-left-button-for-team-carousel"></button>}
          customRightArrow={<button id="custom-right-buttom-for-team-carusel"></button>}
        >
          {teamMembersState.map((member) => (
            <div key={member.id} className="px-[1.05vw]">
              <div className=" mx-auto  rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative   w-full bg-[#4A3223]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.image.url}`}
                    alt={member.photo.alt || member.name}
                    width={748}
                    height={748}
                    style={{ width: "100%", height: "auto" }}
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-base md:text-2xl font-semibold text-[#4A3223] mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.postion}</p>
                  <div className="flex justify-center items-center space-x-4">
                    <a href="#" className="text-gray-600 hover:text-primarycolor transition-colors">
                      <Image src="/assets/icons/email.svg" alt="Email" width={24} height={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primarycolor transition-colors">
                      <Image src="/assets/icons/phone.svg" alt="Phone" width={24} height={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primarycolor transition-colors">
                      <Image src="/assets/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Team;
