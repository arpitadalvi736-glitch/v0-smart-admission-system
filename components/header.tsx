"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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
              <span className="text-[10px] font-semibold text-muted-foreground leading-tight hidden sm:block">
                Admissions should flow not frustrate
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Process
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Statistics
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/admin/login">Admin Login</Link>
            </Button>
            <Button asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Process
              </Link>
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Statistics
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
