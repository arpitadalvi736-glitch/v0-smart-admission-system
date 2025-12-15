import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail } from "lucide-react"

export function HelpCTA() {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
          Can't find what you're looking for? Our support team is here to help you with any questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
            <Link href="/contact">
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 bg-transparent"
          >
            <Link href="/faq">
              <MessageCircle className="w-5 h-5 mr-2" />
              View FAQs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
