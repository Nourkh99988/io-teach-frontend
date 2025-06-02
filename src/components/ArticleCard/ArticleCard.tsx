import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { formatDate } from "../../lib/utils";

interface ArticleCardProps {
  article: Article;
  locale: string;
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={`http://localhost:1337${article.cover.url}`} alt={article.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <time dateTime={article.createdAt}>{formatDate(article.createdAt, locale)}</time>
          <Link href={`/articles/${article.slug}`} className="text-primarycolor hover:text-primarycolor/80 font-medium">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
