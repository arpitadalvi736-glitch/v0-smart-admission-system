import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQAccordion } from "@/components/faq-accordion"
import { FAQCategories } from "@/components/faq-categories"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to the most common questions about our admission process.
            </p>
          </div>

          {/* FAQ Categories */}
          <FAQCategories />

          {/* FAQ Accordion */}
          <FAQAccordion />

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">Didn't find what you were looking for?</p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
