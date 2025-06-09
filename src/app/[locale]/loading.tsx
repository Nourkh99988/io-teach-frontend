import { useTranslations } from "next-intl";
import HeadBG from "@/components/HeadBG/HeadBG";

export default function Loading() {
  const t = useTranslations("loading");

  return (
    <div className="min-h-screen bg-primarycolor flex items-center justify-center relative">
      <HeadBG height="100vh" />
      <div className="z-10 text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
        <h2 className="text-white text-xl">{t("pleaseWait")}</h2>
      </div>
    </div>
  );
}
