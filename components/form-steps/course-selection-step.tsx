"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { courses, campuses } from "@/lib/data"
import { BookOpen, MapPin } from "lucide-react"

interface CourseSelectionStepProps {
  data: {
    preferredCourses: string[]
    preferredCampus: string
  }
  updateData: (data: Partial<CourseSelectionStepProps["data"]>) => void
  errors: Record<string, string>
}

export function CourseSelectionStep({ data, updateData, errors }: CourseSelectionStepProps) {
  const toggleCourse = (course: string) => {
    const updated = data.preferredCourses.includes(course)
      ? data.preferredCourses.filter((c) => c !== course)
      : [...data.preferredCourses, course]
    updateData({ preferredCourses: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Course Selection</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred courses and campus</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <Label className="text-base font-medium">
            Select Courses <span className="text-destructive">*</span>
          </Label>
        </div>
        <p className="text-sm text-muted-foreground mb-4">You can select up to 3 courses in order of preference</p>

        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((course) => {
            const isSelected = data.preferredCourses.includes(course)
            const selectionIndex = data.preferredCourses.indexOf(course)
            const isDisabled = !isSelected && data.preferredCourses.length >= 3

            return (
              <div
                key={course}
                className={`relative flex items-center gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : isDisabled
                      ? "border-border bg-muted/30 cursor-not-allowed opacity-60"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
                onClick={() => !isDisabled && toggleCourse(course)}
              >
                <Checkbox checked={isSelected} disabled={isDisabled} />
                <span className="text-sm font-medium text-foreground">{course}</span>
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {selectionIndex + 1}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        {errors.preferredCourses && <p className="text-xs text-destructive">{errors.preferredCourses}</p>}
        {data.preferredCourses.length > 0 && (
          <p className="text-sm text-muted-foreground">Selected: {data.preferredCourses.join(" → ")}</p>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <Label className="text-base font-medium">
            Preferred Campus <span className="text-destructive">*</span>
          </Label>
        </div>

        <Select value={data.preferredCampus} onValueChange={(value) => updateData({ preferredCampus: value })}>
          <SelectTrigger className={`max-w-md ${errors.preferredCampus ? "border-destructive" : ""}`}>
            <SelectValue placeholder="Select your preferred campus" />
          </SelectTrigger>
          <SelectContent>
            {campuses.map((campus) => (
              <SelectItem key={campus} value={campus}>
                {campus}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.preferredCampus && <p className="text-xs text-destructive">{errors.preferredCampus}</p>}
      </div>
    </div>
  )
}
