"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslations } from "next-intl";
import { SliderData } from "@/types/slider";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/lib/redux/store";
import { useEffect } from "react";
import { setSliders } from "@/lib/redux/slices/sliderSlice";
import { RootState } from "@/lib/redux/store";
import { useLocale } from "next-intl";

export default function SliderClient({ sliders }: { sliders: SliderData[] }) {
  const t = useTranslations("home.slider");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const slidersState = useSelector((state: RootState) => state.slider.sliders);
  useEffect(() => {
    dispatch(setSliders(sliders));

    if (slidersState.length > 0) {
      setSliders(slidersState);
    } else {
      setSliders(sliders);
    }
  }, [sliders, locale]);

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
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {sliders.map((slide) => (
        <div
          key={slide.id}
          className="w-full px-0.5 sm:px-4 md:px-36 flex flex-col-reverse sm:flex-row justify-between items-center"
        >
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
