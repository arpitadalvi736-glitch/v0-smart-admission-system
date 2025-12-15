import { Header } from "@/components/header"
import { StudentDashboardContent } from "@/components/student/dashboard-content"

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <StudentDashboardContent />
        </div>
      </main>
    </div>
  )
}
