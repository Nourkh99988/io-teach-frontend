import HeadBG from "@/components/HeadBG/HeadBG";
import Navbar from "@/components/Navbar/Navbar";
import { formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

// 20 seconds revalidation
export const revalidate = 20;

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  blocks: Array<{
    __component: string;
    id: number;
    body: string;
  }>;
}

interface ArticleResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=createdAt&fields[4]=updatedAt&populate[blocks][populate]=*`,
      { next: { revalidate: 20 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    const response: ArticleResponse = await res.json();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { locale: string; article: string };
}) {
  const article = await getArticle(params.article);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section>
          <Navbar />
          <HeadBG />
        </section>
        <main className="container mx-auto px-4 py-12">
          <p className="text-center text-gray-600">المقال غير موجود.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section>
        <Navbar />
        <HeadBG />
      </section>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="text-sm text-gray-500">
              <time dateTime={article.createdAt}>
                {formatDate(article.createdAt, params.locale)}
              </time>
              {article.updatedAt !== article.createdAt && (
                <span className="mr-2">
                  • تم التحديث:{" "}
                  {formatDate(article.updatedAt, params.locale)}
                </span>
              )}
            </div>
          </header>

          <div className="prose prose-lg max-w-none prose-headings:text-primarycolor prose-headings:font-bold">
            {article.blocks.map((block) => (
              <div key={block.id} className="mb-8">
                <ReactMarkdown>{block.body}</ReactMarkdown>
              </div>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
