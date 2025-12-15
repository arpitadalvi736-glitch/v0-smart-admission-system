import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCategories } from "@/components/help-categories"
import { HelpSearch } from "@/components/help-search"
import { PopularArticles } from "@/components/popular-articles"
import { HelpCTA } from "@/components/help-cta"

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions, learn how to use the admission portal, and get the support you need.
            </p>
            <HelpSearch />
          </div>

          {/* Help Categories */}
          <HelpCategories />

          {/* Popular Articles */}
          <PopularArticles />

          {/* CTA Section */}
          <HelpCTA />
        </div>
      </main>

      <Footer />
    </div>
  )
}
