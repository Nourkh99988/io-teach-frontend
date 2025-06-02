import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("error");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-primarycolor mb-4">{t("serviceNotFound")}</h2>
      <p className="text-gray-600 mb-8">{t("serviceNotFoundMessage")}</p>
      <Link href="/" className="bg-primarycolor text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
        {t("backToHome")}
      </Link>
    </div>
  );
}
