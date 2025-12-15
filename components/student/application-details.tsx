import type { Application } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, BookOpen, FileText, CheckCircle, XCircle } from "lucide-react"
import { categories } from "@/lib/data"

interface ApplicationDetailsProps {
  application: Application
}

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
  const { personalInfo, academicDetails, courseSelection, documents } = application

  const getCategoryLabel = (value: string) => {
    return categories.find((c) => c.value === value)?.label || value
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Full Name</span>
            <span className="font-medium text-foreground">
              {personalInfo.firstName} {personalInfo.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium text-foreground">{personalInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-medium text-foreground">{personalInfo.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date of Birth</span>
            <span className="font-medium text-foreground">{personalInfo.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium text-foreground">{getCategoryLabel(personalInfo.category)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">City</span>
            <span className="font-medium text-foreground">{personalInfo.city}</span>
          </div>
        </CardContent>
      </Card>

      {/* Academic Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            Academic Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Class 10th</p>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">{academicDetails.board10th}</span>
              <span className="font-medium text-foreground">{academicDetails.percentage10th}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Year: {academicDetails.yearOfPassing10th}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Class 12th ({academicDetails.stream})</p>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">{academicDetails.board12th}</span>
              <span className="font-medium text-foreground">{academicDetails.percentage12th}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Year: {academicDetails.yearOfPassing12th}</p>
          </div>
        </CardContent>
      </Card>

      {/* Course Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Course Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Preferred Courses</p>
            <div className="flex flex-wrap gap-2">
              {courseSelection.preferredCourses.map((course, index) => (
                <Badge key={course} variant="secondary" className="text-xs">
                  {index + 1}. {course}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Preferred Campus</span>
            <span className="font-medium text-foreground">{courseSelection.preferredCampus}</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Uploaded Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{doc.name}</span>
                </div>
                {doc.verified ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-orange-500">
                    <XCircle className="h-4 w-4" />
                    <span className="text-xs">Pending</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
