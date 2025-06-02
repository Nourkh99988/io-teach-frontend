"use client";

import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href: string | null;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-primarycolor transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-primarycolor">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
