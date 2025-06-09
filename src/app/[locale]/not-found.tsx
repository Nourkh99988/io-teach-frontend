import { useTranslations } from "next-intl";
import HeadBG from "@/components/HeadBG/HeadBG";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-primarycolor flex items-center justify-center relative">
      <HeadBG height="100vh" />
      <div className="z-10 text-center">
        <h1 className="text-white text-6xl font-bold mb-4">404</h1>
        <h2 className="text-white text-2xl mb-6">{t("pageNotFound")}</h2>
        <p className="text-white/80 mb-8">{t("description")}</p>
        <Link
          href="/"
          className="inline-block bg-white text-primarycolor px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
