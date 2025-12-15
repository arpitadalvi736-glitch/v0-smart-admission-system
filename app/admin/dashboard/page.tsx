import { AdminDashboardContent } from "@/components/admin/dashboard-content"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <AdminDashboardContent />
      </main>
    </div>
  )
}
