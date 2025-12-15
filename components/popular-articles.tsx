import Link from "next/link"
import { ArrowRight, Clock, Eye } from "lucide-react"

export function PopularArticles() {
  const articles = [
    {
      title: "How to Complete Your Application in 5 Easy Steps",
      category: "Application Process",
      readTime: "5 min read",
      views: 2340,
      href: "/help/application/complete-guide",
    },
    {
      title: "Document Requirements and Format Guidelines",
      category: "Document Upload",
      readTime: "3 min read",
      views: 1890,
      href: "/help/documents/requirements",
    },
    {
      title: "Understanding the Admission Timeline",
      category: "General",
      readTime: "4 min read",
      views: 1650,
      href: "/help/timeline",
    },
    {
      title: "How to Check Your Application Status",
      category: "Application Process",
      readTime: "2 min read",
      views: 1420,
      href: "/help/application/check-status",
    },
    {
      title: "Payment Methods and Fee Structure",
      category: "Fees & Payments",
      readTime: "4 min read",
      views: 1280,
      href: "/help/payments/methods",
    },
    {
      title: "Troubleshooting Login Issues",
      category: "Technical Support",
      readTime: "3 min read",
      views: 1150,
      href: "/help/technical/login-issues",
    },
  ]

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground">Popular Articles</h2>
        <Link
          href="/help/articles"
          className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 text-sm"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={article.href}
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-white/20 hover:shadow-lg hover:bg-white transition-all"
          >
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              {article.category}
            </span>
            <h3 className="font-semibold text-foreground mt-3 mb-2 group-hover:text-indigo-600 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()} views
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
