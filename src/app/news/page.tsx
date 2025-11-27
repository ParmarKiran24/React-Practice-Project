// src/app/news/page.tsx
import NewsEvents from "@/components/layout/NewsEvents";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">News & Events</h1>
      <NewsEvents />
    </div>
  );
}
