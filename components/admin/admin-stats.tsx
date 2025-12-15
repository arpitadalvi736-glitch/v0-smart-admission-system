import type { Application } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, XCircle, Users, TrendingUp } from "lucide-react"

interface AdminStatsProps {
  applications: Application[]
}

export function AdminStats({ applications }: AdminStatsProps) {
  const totalApplications = applications.length
  const pendingCount = applications.filter((a) => a.status === "pending").length
  const verifiedCount = applications.filter((a) => a.status === "verified").length
  const selectedCount = applications.filter((a) => a.status === "selected" || a.status === "admitted").length
  const rejectedCount = applications.filter((a) => a.status === "rejected").length

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      change: "+12%",
    },
    {
      label: "Pending Review",
      value: pendingCount,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
      change: "-5%",
    },
    {
      label: "Verified",
      value: verifiedCount,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      change: "+8%",
    },
    {
      label: "Selected",
      value: selectedCount,
      icon: Users,
      color: "bg-primary/10 text-primary",
      change: "+15%",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
      change: "-2%",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
