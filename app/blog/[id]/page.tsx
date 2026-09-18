import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/ui/Header/Header";
import FAQ from "@/components/ui/Faq/Faq";
import ArticleDetail from "@/components/ui/ArticleDetail/ArticleDetail";
import { articles, getArticle, getRelatedArticles } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return { title: "مقاله | دات‌وان تریپ" };

  return {
    title: `${article.title} | دات‌وان تریپ`,
    description: article.body.find((block) => block.type === "p")?.text,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();

  return (
    <>
      <Header variant="light" />
      <ArticleDetail
        article={article}
        related={getRelatedArticles(article.id)}
      />
    </>
  );
}
