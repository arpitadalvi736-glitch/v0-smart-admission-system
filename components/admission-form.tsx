"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PersonalInfoStep } from "@/components/form-steps/personal-info-step"
import { AcademicDetailsStep } from "@/components/form-steps/academic-details-step"
import { CourseSelectionStep } from "@/components/form-steps/course-selection-step"
import { DocumentUploadStep } from "@/components/form-steps/document-upload-step"
import { ReviewStep } from "@/components/form-steps/review-step"
import { SuccessScreen } from "@/components/form-steps/success-screen"
import { Check, ChevronLeft, ChevronRight, Save, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const steps = [
  { id: 1, title: "Personal Info", description: "Basic details" },
  { id: 2, title: "Academic Details", description: "Educational background" },
  { id: 3, title: "Course Selection", description: "Preferences" },
  { id: 4, title: "Documents", description: "Upload files" },
  { id: 5, title: "Review", description: "Final check" },
]

export interface FormData {
  personalInfo: {
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
  academicDetails: {
    board10th: string
    percentage10th: string
    yearOfPassing10th: string
    board12th: string
    percentage12th: string
    yearOfPassing12th: string
    stream: string
  }
  courseSelection: {
    preferredCourses: string[]
    preferredCampus: string
  }
  documents: {
    photo: File | null
    signature: File | null
    marksheet10th: File | null
    marksheet12th: File | null
    idProof: File | null
    categoryProof: File | null
  }
}

const initialFormData: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    category: "",
  },
  academicDetails: {
    board10th: "",
    percentage10th: "",
    yearOfPassing10th: "",
    board12th: "",
    percentage12th: "",
    yearOfPassing12th: "",
    stream: "",
  },
  courseSelection: {
    preferredCourses: [],
    preferredCampus: "",
  },
  documents: {
    photo: null,
    signature: null,
    marksheet10th: null,
    marksheet12th: null,
    idProof: null,
    categoryProof: null,
  },
}

export function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedAppId, setSubmittedAppId] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [validationError, setValidationError] = useState<string>("")

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("admissionDraft", JSON.stringify(formData))
        setLastSaved(new Date())
      }
    }, 2000)

    return () => clearTimeout(saveTimer)
  }, [formData])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("admissionDraft")
      if (savedDraft) {
        try {
          const parsedData = JSON.parse(savedDraft)
          parsedData.documents = initialFormData.documents
          setFormData(parsedData)
        } catch (e) {
          console.error("Failed to load draft", e)
        }
      }
    }
  }, [])

  const updateFormData = (section: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
    setErrors({})
    setValidationError("")
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      const { firstName, lastName, email, phone, dateOfBirth, gender, category, address, city, state, pincode } =
        formData.personalInfo

      if (!firstName.trim()) {
        newErrors.firstName = "First name is required"
      } else if (firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters"
      } else if (!/^[a-zA-Z\s]+$/.test(firstName.trim())) {
        newErrors.firstName = "First name should contain only letters"
      }

      if (!lastName.trim()) {
        newErrors.lastName = "Last name is required"
      } else if (lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters"
      } else if (!/^[a-zA-Z\s]+$/.test(lastName.trim())) {
        newErrors.lastName = "Last name should contain only letters"
      }

      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
        newErrors.email = "Please enter a valid email address"
      }

      if (!phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10}$/.test(phone.trim())) {
        newErrors.phone = "Phone must be exactly 10 digits"
      } else if (/^(.)\1+$/.test(phone.trim())) {
        newErrors.phone = "Please enter a valid phone number"
      }

      if (!dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required"
      } else {
        const dob = new Date(dateOfBirth)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        if (age < 15 || age > 30) {
          newErrors.dateOfBirth = "Age must be between 15 and 30 years"
        }
      }

      if (!gender) newErrors.gender = "Gender is required"
      if (!category) newErrors.category = "Category is required"

      if (!address.trim()) {
        newErrors.address = "Address is required"
      } else if (address.trim().length < 10) {
        newErrors.address = "Please enter a complete address (min 10 characters)"
      }

      if (!city.trim()) {
        newErrors.city = "City is required"
      } else if (!/^[a-zA-Z\s]+$/.test(city.trim())) {
        newErrors.city = "City should contain only letters"
      }

      if (!state.trim()) {
        newErrors.state = "State is required"
      } else if (!/^[a-zA-Z\s]+$/.test(state.trim())) {
        newErrors.state = "State should contain only letters"
      }

      if (!pincode.trim()) {
        newErrors.pincode = "Pincode is required"
      } else if (!/^\d{6}$/.test(pincode.trim())) {
        newErrors.pincode = "Pincode must be exactly 6 digits"
      }
    }

    if (step === 2) {
      const { board10th, percentage10th, yearOfPassing10th, board12th, percentage12th, yearOfPassing12th, stream } =
        formData.academicDetails

      if (!board10th) newErrors.board10th = "10th board is required"

      if (!percentage10th) {
        newErrors.percentage10th = "10th percentage is required"
      } else {
        const perc = Number.parseFloat(percentage10th)
        if (isNaN(perc) || perc < 33 || perc > 100) {
          newErrors.percentage10th = "Percentage must be between 33 and 100"
        }
      }

      if (!yearOfPassing10th) newErrors.yearOfPassing10th = "Year of passing is required"
      if (!board12th) newErrors.board12th = "12th board is required"

      if (!percentage12th) {
        newErrors.percentage12th = "12th percentage is required"
      } else {
        const perc = Number.parseFloat(percentage12th)
        if (isNaN(perc) || perc < 33 || perc > 100) {
          newErrors.percentage12th = "Percentage must be between 33 and 100"
        }
      }

      if (!yearOfPassing12th) newErrors.yearOfPassing12th = "Year of passing is required"

      if (yearOfPassing10th && yearOfPassing12th) {
        const year10 = Number.parseInt(yearOfPassing10th)
        const year12 = Number.parseInt(yearOfPassing12th)
        if (year12 <= year10) {
          newErrors.yearOfPassing12th = "12th year must be after 10th year"
        }
        if (year12 - year10 < 2) {
          newErrors.yearOfPassing12th = "Gap between 10th and 12th must be at least 2 years"
        }
      }

      if (!stream) newErrors.stream = "Stream is required"
    }

    if (step === 3) {
      const { preferredCourses, preferredCampus } = formData.courseSelection
      if (preferredCourses.length === 0) newErrors.preferredCourses = "Select at least one course"
      if (!preferredCampus) newErrors.preferredCampus = "Select a campus"
    }

    if (step === 4) {
      const { photo, signature, marksheet10th, marksheet12th, idProof } = formData.documents

      if (!photo) newErrors.photo = "Passport photo is required"
      if (!signature) newErrors.signature = "Signature is required"
      if (!marksheet10th) newErrors.marksheet10th = "10th marksheet is required"
      if (!marksheet12th) newErrors.marksheet12th = "12th marksheet is required"
      if (!idProof) newErrors.idProof = "ID proof is required"

      const maxSize = 5 * 1024 * 1024 // 5MB
      if (photo && photo.size > maxSize) newErrors.photo = "Photo must be less than 5MB"
      if (signature && signature.size > maxSize) newErrors.signature = "Signature must be less than 5MB"
      if (marksheet10th && marksheet10th.size > maxSize) newErrors.marksheet10th = "File must be less than 5MB"
      if (marksheet12th && marksheet12th.size > maxSize) newErrors.marksheet12th = "File must be less than 5MB"
      if (idProof && idProof.size > maxSize) newErrors.idProof = "File must be less than 5MB"

      const category = formData.personalInfo.category
      if (category && category !== "general" && !formData.documents.categoryProof) {
        newErrors.categoryProof = "Category certificate is required for reserved categories"
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setValidationError("Please fill all required fields correctly before proceeding.")
      return false
    }

    setValidationError("")
    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    const applicationId = "APP" + Math.random().toString(36).substring(2, 8).toUpperCase()

    const newApplication = {
      id: applicationId,
      studentId: "STU" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      personalInfo: {
        ...formData.personalInfo,
      },
      academicDetails: {
        ...formData.academicDetails,
        percentage10th: Number.parseFloat(formData.academicDetails.percentage10th) || 0,
        percentage12th: Number.parseFloat(formData.academicDetails.percentage12th) || 0,
        yearOfPassing10th: Number.parseInt(formData.academicDetails.yearOfPassing10th) || 2021,
        yearOfPassing12th: Number.parseInt(formData.academicDetails.yearOfPassing12th) || 2023,
      },
      courseSelection: formData.courseSelection,
      documents: Object.entries(formData.documents)
        .filter(([, file]) => file !== null)
        .map(([key, file]) => ({
          id: "DOC" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          name: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
          type: "document",
          url: file instanceof File ? URL.createObjectURL(file) : "",
          verified: false,
        })),
      status: "pending" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      submittedAt: new Date(),
    }

    if (typeof window !== "undefined") {
      const existingApps = localStorage.getItem("submittedApplications")
      const applications = existingApps ? JSON.parse(existingApps) : []
      applications.push(newApplication)
      localStorage.setItem("submittedApplications", JSON.stringify(applications))

      localStorage.removeItem("admissionDraft")
    }

    setIsSubmitted(true)
    setSubmittedAppId(applicationId)
  }

  if (isSubmitted) {
    return <SuccessScreen applicationId={submittedAppId} />
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="mt-2 text-center hidden md:block">
                  <p
                    className={`text-xs font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 md:w-20 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden text-center mt-4">
          <p className="text-sm font-medium text-foreground">{steps[currentStep - 1].title}</p>
          <p className="text-xs text-muted-foreground">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {validationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <Card className="p-6 md:p-8">
        {currentStep === 1 && (
          <PersonalInfoStep
            data={formData.personalInfo}
            updateData={(data) => updateFormData("personalInfo", data)}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <AcademicDetailsStep
            data={formData.academicDetails}
            updateData={(data) => updateFormData("academicDetails", data)}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <CourseSelectionStep
            data={formData.courseSelection}
            updateData={(data) => updateFormData("courseSelection", data)}
            errors={errors}
          />
        )}
        {currentStep === 4 && (
          <DocumentUploadStep
            data={formData.documents}
            updateData={(data) => updateFormData("documents", data)}
            errors={errors}
            category={formData.personalInfo.category}
          />
        )}
        {currentStep === 5 && <ReviewStep formData={formData} onEdit={setCurrentStep} />}
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {lastSaved && (
            <>
              <Save className="h-4 w-4" />
              <span>Draft saved {lastSaved.toLocaleTimeString()}</span>
            </>
          )}
        </div>
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Submit Application</Button>
          )}
        </div>
      </div>
    </div>
  )
}
