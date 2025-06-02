import HeadBG from "@/components/HeadBG/HeadBG";
import Navbar from "@/components/Navbar/Navbar";
import { ArticleResponse } from "@/types/article";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const revalidate = 20;

async function getArticles(page: number = 1, search: string = "", locale: string): Promise<ArticleResponse> {
  const searchFilter = search
    ? `&filters[$or][0][title][$containsi]=${search}&filters[$or][1][description][$containsi]=${search}`
    : "";

  try {
    const res = await fetch(
      `http://localhost:1337/api/articles?fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=createdAt&fields[4]=updatedAt&populate[cover][fields][0]=url&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=6${searchFilter}`,
      { next: { revalidate: 20 } }
    );

    if (!res.ok) throw new Error("Failed to fetch articles");
    return res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 6,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { page?: string; search?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || "";

  const { data: articles, meta } = await getArticles(currentPage, searchQuery, params.locale);
  const t = await getTranslations("articles");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeadBG />

      <main className="container mx-auto px-4 py-12">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl text-gray-700">
              {t("searchResults")} <span className="font-semibold">{searchQuery}</span>
            </h2>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} locale={params.locale} />
          ))}
        </div>

        {/* No Results Message */}
        {articles.length === 0 && (
          <p className="text-center text-gray-600 mt-8">{searchQuery ? t("noResultsSearch") : t("noResults")}</p>
        )}

        {/* Pagination */}
        {meta.pagination.pageCount > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: meta.pagination.pageCount }).map((_, index) => {
              const pageNumber = index + 1;
              const pageUrl = new URLSearchParams();
              pageUrl.set("page", String(pageNumber));
              if (searchQuery) {
                pageUrl.set("search", searchQuery);
              }

              return (
                <Link
                  key={index}
                  href={`/${params.locale}/articles?${pageUrl.toString()}`}
                  className={`px-4 py-2 rounded ${
                    currentPage === pageNumber
                      ? "bg-primarycolor text-white"
                      : "bg-white text-primarycolor hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
