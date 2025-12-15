"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationsTable } from "@/components/admin/applications-table"
import { AdminStats } from "@/components/admin/admin-stats"
import { AdminCharts } from "@/components/admin/admin-charts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, RefreshCw } from "lucide-react"
import { courses } from "@/lib/data"
import type { Application, ApplicationStatus } from "@/lib/types"

export function AdminDashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [courseFilter, setCourseFilter] = useState<string>("all")
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const loadApplications = () => {
      const stored = localStorage.getItem("submittedApplications")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          const apps = parsed.map((app: Application) => ({
            ...app,
            createdAt: app.createdAt ? new Date(app.createdAt) : new Date(),
            updatedAt: app.updatedAt ? new Date(app.updatedAt) : new Date(),
            submittedAt: app.submittedAt ? new Date(app.submittedAt) : new Date(),
          }))
          setApplications(apps)
        } catch (e) {
          console.error("Failed to parse applications", e)
        }
      }
    }
    loadApplications()
  }, [])

  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem("submittedApplications", JSON.stringify(applications))
    }
  }, [applications])

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.personalInfo.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.personalInfo.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.personalInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesCourse = courseFilter === "all" || app.courseSelection.preferredCourses.includes(courseFilter)

    return matchesSearch && matchesStatus && matchesCourse
  })

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app)))
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and review all admission applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <AdminStats applications={applications} />

      {/* Charts Section */}
      <AdminCharts applications={applications} />

      {/* Applications Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>All Applications</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ApplicationsTable applications={filteredApplications} onStatusChange={updateApplicationStatus} />
        </CardContent>
      </Card>
    </div>
  )
}
