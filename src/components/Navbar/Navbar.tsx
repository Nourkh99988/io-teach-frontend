"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
}

const Navbar = () => {
  const t = useTranslations("home.nav");
  const locale = useLocale();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/services?fields[0]=title&fields[1]=description&fields[2]=slug&locale=${locale}`
        );
        const data = await response.json();
        setServices(data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/articles?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full py-4 px-4 md:px-6 transition-all duration-300 ${
        isScrolled ? "bg-primarycolor" : "bg-transparent"
      } z-50`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.svg" alt="Logo" width={120} height={40} />
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-2 hover:opacity-80"
          aria-label={t("menu")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-white text-base">
          <Link href="/" className="hover:opacity-80">
            {t("home")}
          </Link>
          <Link href="/about" className="hover:opacity-80">
            {t("about")}
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex items-center hover:opacity-80">
              {t("services")}
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-0 w-[300px] transform transition-all duration-300 ease-in-out ${
                isServicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-primarycolor shadow-lg py-8 mt-2">
                <div className="px-6">
                  <ul className="space-y-4">
                    {services.map((service) => (
                      <li key={service.id} className="group relative">
                        <Link
                          href={`/${service.slug}`}
                          className="block text-white hover:text-white/80 transition-colors duration-200 text-lg font-medium"
                        >
                          {service.title}
                          <span className="invisible group-hover:visible absolute left-full top-0 ml-2 w-64 bg-white text-primarycolor text-sm p-3 rounded shadow-lg">
                            {service.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link href="/articles" className="hover:opacity-80">
            {t("blog")}
          </Link>
          <Link href="/team" className="hover:opacity-80">
            {t("team")}
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            {t("contact")}
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="relative" id="search-container">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:opacity-80"
              aria-label={t("search")}
            >
              <Image src="/assets/icons/search.svg" alt={t("search")} width={20} height={20} />
            </button>

            {/* Search Input */}
            {isSearchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg p-2 z-50"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-64 px-4 py-2 text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:border-primarycolor"
                  autoFocus
                />
              </form>
            )}
          </div>

          {/* Book Appointment Button */}
          <Link
            href="/appointment"
            className="bg-white text-primarycolor px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-base"
          >
            {t("bookAppointment")}
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-primarycolor z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:opacity-80"
                aria-label={t("closeMenu")}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-6 text-white text-lg">
              <Link href="/" className="hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                {t("home")}
              </Link>
              <Link href="/about" className="hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                {t("about")}
              </Link>

              {/* Mobile Services Menu */}
              <div className="space-y-4">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-left hover:opacity-80"
                >
                  {t("services")}
                  <svg
                    className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesOpen && (
                  <ul className="pl-4 space-y-3">
                    {services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/${service.slug}`}
                          className="block text-white/80 hover:text-white transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link href="/articles" className="hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                {t("blog")}
              </Link>
              <Link href="/team" className="hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                {t("team")}
              </Link>
              <Link href="/contact" className="hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                {t("contact")}
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primarycolor"
                />
              </form>

              {/* Mobile Book Appointment Button */}
              <Link
                href="/appointment"
                className="bg-white text-primarycolor px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-base text-center mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("bookAppointment")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
