"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ModalProps {
  header?: string;
  close: (value: boolean) => void;
  body: string;
}

const Modal: React.FC<ModalProps> = ({ header, close, body }) => {
  const t = useTranslations("Modal");

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex justify-center items-center z-[999]"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-[90%] max-w-[400px] bg-white rounded-lg overflow-hidden text-center">
        <p className="bg-[#a98a55] text-black p-1 text-base">{header ? header : t("defaultTitle")}</p>
        <p className="p-5 text-base text-black">{body}</p>
        <button
          className="w-[95%] mx-auto bg-[#a98a55] text-white border-none rounded py-2.5 px-5 my-1 cursor-pointer hover:bg-[#c79033] disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => close(false)}
        >
          {t("ok")}
        </button>
        <div className="block">
          <p className="text-primarycolor">{t("stayUpdated")}</p>

          <div className="flex gap-2.5 justify-center mb-3">
            <a href="https://www.facebook.com/profile.php?id=61576282056339">
              <Image src="/assets/icons/facebook.png" width={35} height={35} alt="facebook" className="w-full h-auto" />
            </a>
            <a href="https://www.instagram.com/husainilaw/">
              <Image
                src="/assets/icons/instagram.png"
                width={35}
                height={35}
                alt="instagram"
                className="w-full h-auto"
              />
            </a>
            <a href="https://wa.me/966538238003">
              <Image src="/assets/icons/whatsapp.png" width={35} height={35} alt="whatsapp" className="w-full h-auto" />
            </a>
            <a href="https://www.linkedin.com/company/%D8%A7%D9%84%D8%AD%D8%B3%D9%8A%D9%86%D9%8A-%D9%84%D9%84%D9%85%D8%AD%D8%A7%D9%85%D8%A9-%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9/">
              <Image src="/assets/icons/linkedin.png" width={35} height={35} alt="linkedin" className="w-full h-auto" />
            </a>
            <a href="https://x.com/husainilaw">
              <Image src="/assets/icons/x.png" width={35} height={35} alt="x" className="w-full h-auto" />
            </a>
          </div>
          {/* <p className="-mt-4 ">{t("followUs")}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
