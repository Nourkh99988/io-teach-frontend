import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SubscribeForm from "./SubscribeForm";

const Footer = async () => {
  const t = await getTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[--color-primarycolor] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-center md:justify-end items-center gap-6">
        {/* Subscribe Section */}
        <SubscribeForm />

        {/* Social Links */}
        <div className="flex items-center gap-4 text-white">
          <Link href="/contacts" className="hover:opacity-80 text-sm md:text-base">
            {t("contacts")}
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/assets/icons/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/assets/icons/twitter.svg"
                alt="Twitter"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/assets/icons/google-plus.svg"
                alt="Google+"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8">
              <Link href="/about" className="text-white hover:opacity-80">
                {t("about")}
              </Link>
              <Link href="/strategy" className="text-white hover:opacity-80">
                {t("strategy")}
              </Link>
              <Link href="/advantages" className="text-white hover:opacity-80">
                {t("advantages")}
              </Link>
              <Link href="/responsibility" className="text-white hover:opacity-80">
                {t("responsibility")}
              </Link>
              <Link href="/services" className="text-white hover:opacity-80">
                {t("services")}
              </Link>
            </div>
            <p className="text-white text-center md:text-left">
              © {currentYear}. {t("rights")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
