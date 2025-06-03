"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Client, ClientResponse } from "@/types/client";

const Clients = () => {
  const [clientReviews, setClientReviews] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/clients?fields[0]=name&fields[1]=position&fields[2]=paragraph&populate[photo][populate][image][fields][0]=url&locale=en"
        );
        const data: ClientResponse = await response.json();
        setClientReviews(data.data);
      } catch (error) {
        console.error("Error fetching client reviews:", error);
      }
    };

    fetchClients();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="py-16 px-4 bg-[--color-primarycolor]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-title font-bold text-center text-white mb-4">What our clients are saying</h2>
        <p className="text-description text-white/80 mb-12 max-w-2xl mx-auto">
          Our clients range from individual investors, to local, international as well as fortune 500 companies.
        </p>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all 0.5s ease"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="px-4"
          customLeftArrow={<button className="custom-left-arrow"></button>}
          customRightArrow={<button className="custom-right-arrow"></button>}
        >
          {clientReviews.map((client) => (
            <div key={client.id} className="px-4">
              <div className="grid md:grid-cols-2 gap-8 items-center w-[] ">
                <div
                  className="relative h-[400px] w-auto"
                  style={{ width: "27vw", maxWidth: "400px", minWidth: "200px", height: "auto" }}
                >
                  <Image
                    src={`http://localhost:1337${client.photo.image.url}`}
                    alt={client.photo.alt}
                    width={748}
                    height={748}
                    className="object-cover rounded-lg"
                    style={{ width: "27vw", maxWidth: "400px", minWidth: "200px", height: "auto" }}
                  />
                </div>
                <div className="text-white">
                  <svg className="h-12 w-12 text-white/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base mb-8 leading-relaxed">{client.paragraph}</p>
                  <div>
                    <h3 className="text-subtitle font-semibold">{client.name}</h3>
                    <p className="text-description text-white/80">{client.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Navigation Dots Styles */}
        <style jsx global>{`
          .custom-dot-list-style {
            display: flex;
            justify-center: center;
            gap: 8px;
            margin-top: 2rem;
          }
          .custom-dot-list-style button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            border: none;
            padding: 0;
            margin: 0;
            transition: all 0.3s ease;
          }
          .custom-dot-list-style .react-multi-carousel-dot--active button {
            background: white;
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </section>
  );
};

export default Clients;
