"use client"

import type { Application } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Pie, PieChart, Legend } from "recharts"
import { courses } from "@/lib/data"

interface AdminChartsProps {
  applications: Application[]
}

export function AdminCharts({ applications }: AdminChartsProps) {
  // Course distribution data
  const courseData = courses
    .map((course) => ({
      name: course.length > 15 ? course.substring(0, 15) + "..." : course,
      fullName: course,
      applications: applications.filter((a) => a.courseSelection.preferredCourses.includes(course)).length,
    }))
    .filter((c) => c.applications > 0)
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 6)

  // Status distribution data
  const statusData = [
    {
      name: "Pending",
      value: applications.filter((a) => a.status === "pending").length,
      color: "#eab308",
    },
    {
      name: "Verified",
      value: applications.filter((a) => a.status === "verified").length,
      color: "#3b82f6",
    },
    {
      name: "Selected",
      value: applications.filter((a) => a.status === "selected" || a.status === "admitted").length,
      color: "#22c55e",
    },
    {
      name: "Rejected",
      value: applications.filter((a) => a.status === "rejected").length,
      color: "#ef4444",
    },
    {
      name: "Waitlisted",
      value: applications.filter((a) => a.status === "waitlisted").length,
      color: "#f97316",
    },
  ].filter((s) => s.value > 0)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Applications by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <Tooltip
                  formatter={(value, name, props) => [value, props.payload.fullName]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="applications" fill="var(--primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
