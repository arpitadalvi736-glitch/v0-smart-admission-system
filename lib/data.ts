import type { Application, ApplicationStatus } from "./types"

// Mock data for demonstration - ready for Supabase integration
export const mockApplications: Application[] = []

export const courses = [
  "Computer Science",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics & Communication",
  "Business Administration",
  "Economics",
  "Commerce",
  "Arts & Humanities",
]

export const campuses = ["Main Campus", "City Campus", "Tech Campus"]

export const categories = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "ews", label: "EWS" },
]

export const boards = ["CBSE", "ICSE", "ISC", "State Board", "IB", "Cambridge", "Other"]

export const streams = ["Science", "Commerce", "Arts", "Vocational"]

export function getStatusColor(status: ApplicationStatus): string {
  const colors: Record<ApplicationStatus, string> = {
    draft: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
    verified: "bg-blue-100 text-blue-700",
    selected: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    waitlisted: "bg-orange-100 text-orange-700",
    admitted: "bg-primary/10 text-primary",
  }
  return colors[status]
}

export function getStatusLabel(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    draft: "Draft",
    pending: "Pending Review",
    verified: "Verified",
    selected: "Selected",
    rejected: "Rejected",
    waitlisted: "Waitlisted",
    admitted: "Admitted",
  }
  return labels[status]
}
