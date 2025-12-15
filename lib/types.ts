export type ApplicationStatus = "draft" | "pending" | "verified" | "selected" | "rejected" | "waitlisted" | "admitted"

export interface Application {
  id: string
  studentId: string
  personalInfo: PersonalInfo
  academicDetails: AcademicDetails
  courseSelection: CourseSelection
  documents: Document[]
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
  submittedAt?: Date
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  pincode: string
  category: string
}

export interface AcademicDetails {
  board10th: string
  percentage10th: number
  yearOfPassing10th: number
  board12th: string
  percentage12th: number
  yearOfPassing12th: number
  stream: string
}

export interface CourseSelection {
  preferredCourses: string[]
  preferredCampus: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  verified: boolean
}

export interface Student {
  id: string
  email: string
  name: string
  applicationId?: string
}

export interface Admin {
  id: string
  email: string
  name: string
  role: "admin" | "super_admin"
}
