import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-primary-foreground"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  <span className="text-primary">Admit</span>
                  <span className="text-foreground">Flow</span>
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground leading-tight">
                  Admissions should flow not frustrate
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Simplifying college admissions with smart technology. Apply, track, and get admitted to your dream
              institution seamlessly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/apply" className="text-muted-foreground hover:text-foreground transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/student/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AdmitFlow. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
