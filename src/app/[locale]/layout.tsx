import type { Metadata } from "next";
import { Cairo, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ReduxProvider } from "@/lib/redux/provider";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { fetchFromStrapi } from "@/lib/API/fetchApi";
import { ServiceResponse } from "@/types/navbar";
import { endpointUrls } from "@/lib/API/endPoints";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  const { locale } = await params;
  const directory = locale === "ar" ? "rtl" : "ltr";
  const responseServices = await fetchFromStrapi<ServiceResponse>(endpointUrls.servicesUrl, locale);
  const services = responseServices?.data || [];
  console.log(services);

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body className={`${dmSans.variable} ${cairo.variable} antialiased`} dir={directory}>
          <ReduxProvider>
            <Navbar services={services} />
            {children}
          </ReduxProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
