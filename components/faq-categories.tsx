"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Questions" },
  { id: "application", label: "Application" },
  { id: "documents", label: "Documents" },
  { id: "eligibility", label: "Eligibility" },
  { id: "fees", label: "Fees" },
  { id: "technical", label: "Technical" },
]

export function FAQCategories() {
  const [active, setActive] = useState("all")

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActive(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            active === category.id
              ? "bg-indigo-600 text-white"
              : "bg-white/80 text-muted-foreground hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200",
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
