"use client"

import { useState } from "react"
import type { Application, ApplicationStatus } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { getStatusColor, getStatusLabel, categories } from "@/lib/data"
import { MoreHorizontal, Eye, CheckCircle, XCircle, Clock, ArrowUpDown, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ApplicationsTableProps {
  applications: Application[]
  onStatusChange: (appId: string, status: ApplicationStatus) => void
}

type SortField = "name" | "marks" | "date" | "status"
type SortDirection = "asc" | "desc"

export function ApplicationsTable({ applications, onStatusChange }: ApplicationsTableProps) {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    app: Application
    action: ApplicationStatus
  } | null>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedApplications = [...applications].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "name":
        comparison = `${a.personalInfo.firstName} ${a.personalInfo.lastName}`.localeCompare(
          `${b.personalInfo.firstName} ${b.personalInfo.lastName}`,
        )
        break
      case "marks":
        comparison = a.academicDetails.percentage12th - b.academicDetails.percentage12th
        break
      case "date":
        comparison = (a.submittedAt?.getTime() || 0) - (b.submittedAt?.getTime() || 0)
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getCategoryLabel = (value: string) => {
    return categories.find((c) => c.value === value)?.label || value
  }

  const handleStatusAction = (app: Application, action: ApplicationStatus) => {
    setConfirmAction({ app, action })
  }

  const confirmStatusChange = () => {
    if (confirmAction) {
      onStatusChange(confirmAction.app.id, confirmAction.action)
      setConfirmAction(null)
    }
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">App ID</TableHead>
              <TableHead>
                <button onClick={() => handleSort("name")} className="flex items-center gap-1 hover:text-foreground">
                  Student Name
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Course</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead>
                <button onClick={() => handleSort("marks")} className="flex items-center gap-1 hover:text-foreground">
                  12th %
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead>
                <button onClick={() => handleSort("status")} className="flex items-center gap-1 hover:text-foreground">
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              sortedApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">{app.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {app.personalInfo.firstName} {app.personalInfo.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">{app.personalInfo.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm">{app.courseSelection.preferredCourses[0]}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm">{getCategoryLabel(app.personalInfo.category)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{app.academicDetails.percentage12th}%</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>{getStatusLabel(app.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedApp(app)
                            setShowDetails(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {app.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleStatusAction(app, "verified")}>
                            <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                            Mark as Verified
                          </DropdownMenuItem>
                        )}
                        {(app.status === "pending" || app.status === "verified") && (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusAction(app, "selected")}>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                              Select
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusAction(app, "waitlisted")}>
                              <Clock className="h-4 w-4 mr-2 text-orange-500" />
                              Waitlist
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusAction(app, "rejected")}>
                              <XCircle className="h-4 w-4 mr-2 text-destructive" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {app.status === "selected" && (
                          <DropdownMenuItem onClick={() => handleStatusAction(app, "admitted")}>
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Confirm Admission
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details - {selectedApp?.id}</DialogTitle>
            <DialogDescription>Complete information about the applicant</DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium">
                        {selectedApp.personalInfo.firstName} {selectedApp.personalInfo.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{selectedApp.personalInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">{selectedApp.personalInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{getCategoryLabel(selectedApp.personalInfo.category)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Academic Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">10th Board</span>
                      <span className="font-medium">{selectedApp.academicDetails.board10th}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">10th %</span>
                      <span className="font-medium">{selectedApp.academicDetails.percentage10th}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">12th Board</span>
                      <span className="font-medium">{selectedApp.academicDetails.board12th}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">12th %</span>
                      <span className="font-medium">{selectedApp.academicDetails.percentage12th}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stream</span>
                      <span className="font-medium">{selectedApp.academicDetails.stream}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Course Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.courseSelection.preferredCourses.map((course, idx) => (
                    <Badge key={course} variant="secondary">
                      {idx + 1}. {course}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Campus: {selectedApp.courseSelection.preferredCampus}</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Documents</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedApp.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm">
                      {doc.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-orange-500" />
                      )}
                      <span>{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Confirm Action
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to mark application {confirmAction?.app.id} as{" "}
              <strong>{confirmAction?.action}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>
              Cancel
            </Button>
            <Button onClick={confirmStatusChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
