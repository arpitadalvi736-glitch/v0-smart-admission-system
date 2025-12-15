"use client"

import type { FormData } from "@/components/admission-form"
import { Button } from "@/components/ui/button"
import { Pencil, User, GraduationCap, BookOpen, FileText, CheckCircle } from "lucide-react"
import { categories } from "@/lib/data"

interface ReviewStepProps {
  formData: FormData
  onEdit: (step: number) => void
}

export function ReviewStep({ formData, onEdit }: ReviewStepProps) {
  const { personalInfo, academicDetails, courseSelection, documents } = formData

  const getCategoryLabel = (value: string) => {
    return categories.find((c) => c.value === value)?.label || value
  }

  const uploadedDocuments = Object.entries(documents).filter(([_, file]) => file !== null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Review Your Application</h2>
        <p className="text-sm text-muted-foreground">Please review all details before submitting</p>
      </div>

      {/* Personal Information */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Personal Information</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Full Name:</span>
            <p className="font-medium text-foreground">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <p className="font-medium text-foreground">{personalInfo.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span>
            <p className="font-medium text-foreground">{personalInfo.phone}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Date of Birth:</span>
            <p className="font-medium text-foreground">{personalInfo.dateOfBirth}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Gender:</span>
            <p className="font-medium text-foreground capitalize">{personalInfo.gender}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Category:</span>
            <p className="font-medium text-foreground">{getCategoryLabel(personalInfo.category)}</p>
          </div>
          {personalInfo.address && (
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Address:</span>
              <p className="font-medium text-foreground">
                {personalInfo.address}
                {personalInfo.city && `, ${personalInfo.city}`}
                {personalInfo.state && `, ${personalInfo.state}`}
                {personalInfo.pincode && ` - ${personalInfo.pincode}`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Academic Details */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Academic Details</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="p-4 space-y-4 text-sm">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <span className="text-muted-foreground">10th Board:</span>
              <p className="font-medium text-foreground">{academicDetails.board10th}</p>
            </div>
            <div>
              <span className="text-muted-foreground">10th Percentage:</span>
              <p className="font-medium text-foreground">{academicDetails.percentage10th}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Year of Passing:</span>
              <p className="font-medium text-foreground">{academicDetails.yearOfPassing10th}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <span className="text-muted-foreground">12th Board:</span>
              <p className="font-medium text-foreground">{academicDetails.board12th}</p>
            </div>
            <div>
              <span className="text-muted-foreground">12th Percentage:</span>
              <p className="font-medium text-foreground">{academicDetails.percentage12th}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Year of Passing:</span>
              <p className="font-medium text-foreground">{academicDetails.yearOfPassing12th}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Stream:</span>
              <p className="font-medium text-foreground">{academicDetails.stream}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Course Selection</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">Preferred Courses (in order):</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {courseSelection.preferredCourses.map((course, index) => (
                <span
                  key={course}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    {index + 1}
                  </span>
                  {course}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Preferred Campus:</span>
            <p className="font-medium text-foreground">{courseSelection.preferredCampus}</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Uploaded Documents</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-3">
            {uploadedDocuments.map(([key, file]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-muted-foreground truncate">({(file as File).name})</span>
              </div>
            ))}
          </div>
          {uploadedDocuments.length === 0 && <p className="text-sm text-muted-foreground">No documents uploaded</p>}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Ready to Submit</p>
            <p className="text-xs text-muted-foreground mt-1">
              By submitting this application, you confirm that all the information provided is accurate and true to the
              best of your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
