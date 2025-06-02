"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocale, useTranslations } from "next-intl";

interface TeamMemberPhoto {
  id: number;
  alt: string;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
}

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  postion: string;
  photo: TeamMemberPhoto;
}

interface TeamResponse {
  data: TeamMember[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Team = () => {
  const locale = useLocale();
  const t = useTranslations("team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team-members?fields[0]=name&fields[1]=postion&populate[photo][populate][image][fields][0]=url&locale=${locale}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const data: TeamResponse = await response.json();

        setTeamMembers(data.data);
        setError(null);
      } catch (err) {
        setError(t("fetchError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [locale, t]);

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

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-gray-600">{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-title md:text-4xl font-bold text-center text-[#4A3223] mb-4">{t("title")}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-description">{t("subtitle")}</p>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all 0.5s ease"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list"
          itemClass="carousel-item-padding-40-px"
          centerMode={false}
          className="team-carousel"
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="px-4">
              <div className="w-[20vw] max-w[300px] min-w[200px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-80 w-full bg-[#4A3223]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.image.url}`}
                    alt={member.photo.alt || member.name}
                    fill
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
