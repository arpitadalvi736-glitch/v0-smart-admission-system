"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LogOut, GraduationCap, ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">SmartAdmit</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:sticky top-0 left-0 z-50 md:z-0 h-screen bg-card border-r border-border
        transition-all duration-300 flex flex-col
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "md:w-16" : "w-64"}
      `}
      >
        {/* Logo */}
        <div className="h-14 md:h-16 flex items-center justify-between px-4 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && <span className="font-semibold text-foreground">SmartAdmit</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Spacer for mobile header */}
      <div className="md:hidden h-14" />
    </>
  )
}
