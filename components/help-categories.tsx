import Link from "next/link"
import { FileText, Upload, CreditCard, User, Settings, HelpCircle, BookOpen, Shield } from "lucide-react"

export function HelpCategories() {
  const categories = [
    {
      icon: FileText,
      title: "Application Process",
      description: "Learn how to submit and track your application",
      articles: 12,
      href: "/help/application",
    },
    {
      icon: Upload,
      title: "Document Upload",
      description: "Guidelines for uploading required documents",
      articles: 8,
      href: "/help/documents",
    },
    {
      icon: CreditCard,
      title: "Fees & Payments",
      description: "Information about fees and payment methods",
      articles: 6,
      href: "/help/payments",
    },
    {
      icon: User,
      title: "Account Management",
      description: "Manage your profile and login credentials",
      articles: 5,
      href: "/help/account",
    },
    {
      icon: BookOpen,
      title: "Course Selection",
      description: "Guide to choosing your preferred courses",
      articles: 10,
      href: "/help/courses",
    },
    {
      icon: Shield,
      title: "Eligibility Criteria",
      description: "Understand admission requirements",
      articles: 7,
      href: "/help/eligibility",
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Troubleshoot technical issues",
      articles: 9,
      href: "/help/technical",
    },
    {
      icon: HelpCircle,
      title: "General FAQs",
      description: "Answers to commonly asked questions",
      articles: 15,
      href: "/faq",
    },
  ]

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Browse by Category</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20 hover:shadow-lg hover:bg-white transition-all"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <category.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-1 group-hover:text-indigo-600 transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
            <span className="text-xs text-indigo-600 font-medium">{category.articles} articles</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
