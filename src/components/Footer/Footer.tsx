"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[--color-primarycolor] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end items-center gap-6">
        <div className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 bg-white rounded-sm text-[--color-primarycolor] outline-none"
          />
          <button className="px-4 py-2 bg-[--color-primarycolor] text-white border border-white rounded-sm hover:bg-white hover:text-[--color-primarycolor] transition-colors">
            Subscribe
          </button>
        </div>
        <div className="flex items-center gap-4 text-white">
          <Link href="/contacts" className="hover:opacity-80">
            Contacts
          </Link>
          <Link href="#" className="hover:opacity-80">
            <Image src="/assets/icons/facebook.svg" alt="Facebook" width={20} height={20} className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:opacity-80">
            <Image src="/assets/icons/twitter.svg" alt="Twitter" width={20} height={20} className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:opacity-80">
            <Image src="/assets/icons/google-plus.svg" alt="Google+" width={20} height={20} className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              <Link href="/about" className="text-white hover:opacity-80">
                About
              </Link>
              <Link href="/strategy" className="text-white hover:opacity-80">
                Our Strategy
              </Link>
              <Link href="/advantages" className="text-white hover:opacity-80">
                Our Advantages
              </Link>
              <Link href="/responsibility" className="text-white hover:opacity-80">
                Social Responsibility
              </Link>
              <Link href="/services" className="text-white hover:opacity-80">
                Our Services
              </Link>
            </div>
            <p className="text-white">© {currentYear}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
