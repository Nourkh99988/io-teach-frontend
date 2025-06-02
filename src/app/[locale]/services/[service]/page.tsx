import HeadBG from "@/components/HeadBG/HeadBG";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

interface Section {
  title: string;
  content: string;
  bulletPoints?: string[];
}

interface ServiceData {
  id: number;
  title: string;
  description: string;
  sections?: Section[];
}

// Fetch service data from API
async function getServiceData(service: string, locale: string): Promise<ServiceData | null> {
  try {
    const response = await fetch(
      `http://localhost:1337/api/services?filters[slug][$eq]=${service}&fields[0]=title&fields[1]=description&populate=*&locale=${locale}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch service data");
    }
    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));
    console.log("Service Slug:", service);

    // Return the first item directly
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const serviceData = data.data[0];
      console.log("Service Data Structure:", serviceData);
      return {
        id: serviceData.id,
        title: serviceData.title,
        description: serviceData.description,
        sections: serviceData.sections,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching service data:", error);
    return null;
  }
}

// Set revalidation time for ISR
export const revalidate = 20;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service } = await params;
  const serviceData = await getServiceData(service, locale);

  if (!serviceData) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: serviceData.title,
    description: serviceData.description,
    openGraph: {
      title: serviceData.title,
      description: serviceData.description,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service } = await params;
  const serviceData = await getServiceData(service, locale);

  console.log("Service Data:", JSON.stringify(serviceData, null, 2));
  if (!serviceData) {
    console.log("No service data found");
    notFound();
  }

  console.log("Service Data:", JSON.stringify(serviceData, null, 2));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: serviceData.title, href: null },
  ];

  return (
    <main className="min-h-screen bg-backgroundcolor2">
      <section>
        <Navbar />
        <HeadBG />
      </section>

      <section className="relative py-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/assets/services/bg.svg" alt="Background Pattern" fill className="object-cover opacity-5" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-base mb-10 hover:opacity-80">
            <span className="text-primarycolor">‹</span>
            <span className="ml-1">Back</span>
          </Link>
          {/* Title */}{" "}
          <h1 className="text-3xl md:text-4xl font-bold text-[--color-primarycolor] mb-6">{serviceData.title}</h1>
          {/* Description */}
          <p className="text-gray-600 mb-12 leading-relaxed max-w-4xl">{serviceData.description}</p> {/* Sections */}
          <div className="space-y-12">
            {serviceData.sections &&
              serviceData.sections.map((section: Section, index: number) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="relative pl-6 text-xl font-semibold text-[--color-primarycolor] mb-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-[2px] before:bg-[--color-primarycolor]">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed">
                    <p className="mb-4 relative pl-6 border-l-2 border-[--color-primarycolor]/20">{section.content}</p>
                    {section.bulletPoints && (
                      <ul className="space-y-2 ml-4 marker:text-[--color-primarycolor]">
                        {section.bulletPoints.map((point: string, idx: number) => (
                          <li
                            key={idx}
                            className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-4 before:h-[2px] before:bg-[--color-primarycolor]/40"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {/* Footer Text */}
          {/* <p className="text-gray-600 mt-12 text-center max-w-3xl mx-auto">{attributes?.footer}</p> */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
