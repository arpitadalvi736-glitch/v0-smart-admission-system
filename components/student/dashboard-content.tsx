"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusTimeline } from "@/components/student/status-timeline"
import { ApplicationDetails } from "@/components/student/application-details"
import { mockApplications, getStatusColor, getStatusLabel } from "@/lib/data"
import { Download, FileText, Bell, User, BookOpen, Calendar, LogOut } from "lucide-react"
import Link from "next/link"

export function StudentDashboardContent() {
  // Using first mock application for demo
  const application = mockApplications[0]
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome, {application.personalInfo.firstName}!
          </h1>
          <p className="text-muted-foreground">Application ID: {application.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Application
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card className="glass overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <Badge className={`mt-1 ${getStatusColor(application.status)}`}>
                  {getStatusLabel(application.status)}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {application.status === "selected" &&
                "Congratulations! You have been selected. Please complete the admission formalities."}
              {application.status === "pending" &&
                "Your application is being reviewed. We'll notify you once the verification is complete."}
              {application.status === "verified" &&
                "Your documents have been verified. Selection results will be announced soon."}
            </p>
          </div>
          <div className="w-full md:w-64 bg-muted/30 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Next Step</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {application.status === "selected" && "Pay admission fees and complete enrollment"}
              {application.status === "pending" && "Await document verification"}
              {application.status === "verified" && "Wait for selection announcement"}
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred Course</p>
                <p className="font-medium text-foreground">{application.courseSelection.preferredCourses[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">12th Percentage</p>
                <p className="font-medium text-foreground">{application.academicDetails.percentage12th}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applied On</p>
                <p className="font-medium text-foreground">
                  {application.submittedAt?.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "details"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Application Details
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" ? (
        <StatusTimeline status={application.status} />
      ) : (
        <ApplicationDetails application={application} />
      )}
    </div>
  )
}
