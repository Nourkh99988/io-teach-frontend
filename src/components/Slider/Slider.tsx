"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocale, useTranslations } from "next-intl";

interface SliderData {
  id: number;
  title: string;
  description: string;
  link: string;
  photo: {
    alt: string;
    image: {
      url: string;
    };
  };
}

export default function Slider() {
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const t = useTranslations("home.slider");
  const locale = useLocale();
  //  const dir = locale === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/sliders?fields[0]=title&fields[1]=description&fields[2]=link&populate[photo][populate][image][fields][0]=url&locale=${locale}`
        );
        const data = await response.json();
        setSliders(data.data);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };

    fetchSliders();
  }, []);

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {sliders.map((slide) => (
        <div key={slide.id} className="w-full px-36 flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-subtitle font-bold">{slide.title}</h2>
            <p className="text-white text-description">{slide.description}</p>
            <a
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-base text-primarycolor px-4 py-2 rounded hover:bg-primarycolor hover:text-white transition-colors w-fit"
            >
              {t("readMore")}
            </a>
          </div>
          <div className="max-w-[300px] w-full">
            <Image
              src={`http://localhost:1337${slide.photo.image.url}`}
              width={748}
              height={748}
              alt={slide.photo.alt || "Slider Image"}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
