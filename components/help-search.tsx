"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HelpSearch() {
  const [query, setQuery] = useState("")

  return (
    <div className="max-w-xl mx-auto relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for help articles..."
        className="pl-12 pr-4 py-6 text-lg rounded-xl bg-white/80 backdrop-blur-sm border-white/20 shadow-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
