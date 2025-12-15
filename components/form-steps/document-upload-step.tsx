"use client"

import type React from "react"

import { useRef } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, ImageIcon, Check, AlertCircle } from "lucide-react"

interface DocumentUploadStepProps {
  data: {
    photo: File | null
    signature: File | null
    marksheet10th: File | null
    marksheet12th: File | null
    idProof: File | null
    categoryProof: File | null
  }
  updateData: (data: Partial<DocumentUploadStepProps["data"]>) => void
  errors?: Record<string, string>
  category?: string
}

const getDocumentFields = (category: string) =>
  [
    { key: "photo", label: "Passport Photo", accept: "image/*", icon: ImageIcon, required: true },
    { key: "signature", label: "Signature", accept: "image/*", icon: ImageIcon, required: true },
    { key: "marksheet10th", label: "10th Marksheet", accept: ".pdf,image/*", icon: FileText, required: true },
    { key: "marksheet12th", label: "12th Marksheet", accept: ".pdf,image/*", icon: FileText, required: true },
    { key: "idProof", label: "ID Proof (Aadhaar/PAN)", accept: ".pdf,image/*", icon: FileText, required: true },
    {
      key: "categoryProof",
      label: "Category Certificate",
      accept: ".pdf,image/*",
      icon: FileText,
      required: category !== "general" && category !== "",
    },
  ] as const

export function DocumentUploadStep({ data, updateData, errors = {}, category = "" }: DocumentUploadStepProps) {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const documentFields = getDocumentFields(category)

  const handleFileChange = (key: keyof typeof data, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }
    updateData({ [key]: file })
  }

  const handleDrop = (key: keyof typeof data, e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileChange(key, file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Document Upload</h2>
        <p className="text-sm text-muted-foreground">
          Upload all required documents in PDF or image format (max 5MB each). All fields marked with * are mandatory.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {documentFields.map((field) => {
          const file = data[field.key]
          const Icon = field.icon
          const hasError = errors[field.key]

          return (
            <div key={field.key} className="space-y-2">
              <Label className="text-sm">
                {field.label} {field.required && <span className="text-destructive">*</span>}
              </Label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
                  hasError
                    ? "border-destructive bg-destructive/5"
                    : file
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(field.key, e)}
              >
                <input
                  ref={(el) => {
                    fileInputRefs.current[field.key] = el
                  }}
                  type="file"
                  accept={field.accept}
                  onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                  className="hidden"
                />

                {file ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleFileChange(field.key, null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center gap-2 py-4 cursor-pointer"
                    onClick={() => fileInputRefs.current[field.key]?.click()}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${hasError ? "bg-destructive/10" : "bg-muted"}`}
                    >
                      {hasError ? (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        <span className={`font-medium ${hasError ? "text-destructive" : "text-primary"}`}>
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF or Image (max 5MB)</p>
                    </div>
                  </div>
                )}
              </div>
              {hasError && <p className="text-xs text-destructive">{errors[field.key]}</p>}
            </div>
          )
        })}
      </div>

      <div className="p-4 rounded-lg bg-muted/50">
        <div className="flex items-start gap-3">
          <Upload className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Document Guidelines</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Photo should be recent, passport-sized with white background</li>
              <li>• Signature should be on white paper with black/blue ink</li>
              <li>• All documents should be clearly visible and not blurred</li>
              <li>• Marksheets must show your name, roll number, and marks clearly</li>
              <li>• Category certificate is required only for reserved categories (SC/ST/OBC/EWS)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
