import type { ApplicationStatus } from "@/lib/types"
import { Check, Clock, FileCheck, Award, GraduationCap, X } from "lucide-react"

interface StatusTimelineProps {
  status: ApplicationStatus
}

const timelineSteps = [
  {
    id: "submitted",
    title: "Application Submitted",
    description: "Your application has been received",
    icon: FileCheck,
    statuses: ["pending", "verified", "selected", "rejected", "waitlisted", "admitted"],
  },
  {
    id: "verified",
    title: "Documents Verified",
    description: "Your documents have been reviewed and verified",
    icon: Check,
    statuses: ["verified", "selected", "rejected", "waitlisted", "admitted"],
  },
  {
    id: "selected",
    title: "Selection",
    description: "Based on eligibility and merit",
    icon: Award,
    statuses: ["selected", "admitted"],
    rejectedStatuses: ["rejected"],
    waitlistedStatuses: ["waitlisted"],
  },
  {
    id: "admitted",
    title: "Admission Complete",
    description: "Welcome to the institution!",
    icon: GraduationCap,
    statuses: ["admitted"],
  },
]

export function StatusTimeline({ status }: StatusTimelineProps) {
  const getStepStatus = (step: (typeof timelineSteps)[0]) => {
    if (step.rejectedStatuses?.includes(status)) return "rejected"
    if (step.waitlistedStatuses?.includes(status)) return "waitlisted"
    if (step.statuses.includes(status)) return "completed"
    return "pending"
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Application Timeline</h3>

        <div className="relative">
          {timelineSteps.map((step, index) => {
            const stepStatus = getStepStatus(step)
            const isLast = index === timelineSteps.length - 1
            const Icon = step.icon

            return (
              <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Vertical Line */}
                {!isLast && (
                  <div
                    className={`absolute left-5 top-10 w-0.5 h-[calc(100%-2.5rem)] ${
                      stepStatus === "completed" ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    stepStatus === "completed"
                      ? "bg-primary text-primary-foreground"
                      : stepStatus === "rejected"
                        ? "bg-destructive text-destructive-foreground"
                        : stepStatus === "waitlisted"
                          ? "bg-orange-500 text-white"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepStatus === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : stepStatus === "rejected" ? (
                    <X className="h-5 w-5" />
                  ) : stepStatus === "waitlisted" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h4
                    className={`font-medium ${
                      stepStatus === "completed"
                        ? "text-foreground"
                        : stepStatus === "rejected"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                    {stepStatus === "rejected" && step.id === "selected" && " - Not Selected"}
                    {stepStatus === "waitlisted" && step.id === "selected" && " - Waitlisted"}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  {stepStatus === "completed" && (
                    <p className="text-xs text-primary mt-2">
                      Completed on{" "}
                      {new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Important Dates */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Important Dates</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Document Verification Deadline</p>
              <p className="text-xs text-muted-foreground">January 31, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Selection Results</p>
              <p className="text-xs text-muted-foreground">February 15, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Fee Payment Deadline</p>
              <p className="text-xs text-muted-foreground">March 1, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Session Begins</p>
              <p className="text-xs text-muted-foreground">July 1, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
