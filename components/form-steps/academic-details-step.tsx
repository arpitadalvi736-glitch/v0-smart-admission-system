"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { boards, streams } from "@/lib/data"

interface AcademicDetailsStepProps {
  data: {
    board10th: string
    percentage10th: string
    yearOfPassing10th: string
    board12th: string
    percentage12th: string
    yearOfPassing12th: string
    stream: string
  }
  updateData: (data: Partial<AcademicDetailsStepProps["data"]>) => void
  errors: Record<string, string>
}

export function AcademicDetailsStep({ data, updateData, errors }: AcademicDetailsStepProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Academic Details</h2>
        <p className="text-sm text-muted-foreground">Provide your educational background information</p>
      </div>

      {/* 10th Class Details */}
      <div className="p-4 rounded-lg bg-muted/50">
        <h3 className="text-sm font-semibold text-foreground mb-4">Class 10th Details</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="board10th">
              Board <span className="text-destructive">*</span>
            </Label>
            <Select value={data.board10th} onValueChange={(value) => updateData({ board10th: value })}>
              <SelectTrigger className={errors.board10th ? "border-destructive" : ""}>
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board} value={board}>
                    {board}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.board10th && <p className="text-xs text-destructive">{errors.board10th}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage10th">
              Percentage/CGPA <span className="text-destructive">*</span>
            </Label>
            <Input
              id="percentage10th"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={data.percentage10th}
              onChange={(e) => updateData({ percentage10th: e.target.value })}
              placeholder="e.g., 85.5"
              className={errors.percentage10th ? "border-destructive" : ""}
            />
            {errors.percentage10th && <p className="text-xs text-destructive">{errors.percentage10th}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearOfPassing10th">
              Year of Passing <span className="text-destructive">*</span>
            </Label>
            <Select value={data.yearOfPassing10th} onValueChange={(value) => updateData({ yearOfPassing10th: value })}>
              <SelectTrigger className={errors.yearOfPassing10th ? "border-destructive" : ""}>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.yearOfPassing10th && <p className="text-xs text-destructive">{errors.yearOfPassing10th}</p>}
          </div>
        </div>
      </div>

      {/* 12th Class Details */}
      <div className="p-4 rounded-lg bg-muted/50">
        <h3 className="text-sm font-semibold text-foreground mb-4">Class 12th Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="board12th">
              Board <span className="text-destructive">*</span>
            </Label>
            <Select value={data.board12th} onValueChange={(value) => updateData({ board12th: value })}>
              <SelectTrigger className={errors.board12th ? "border-destructive" : ""}>
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board} value={board}>
                    {board}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.board12th && <p className="text-xs text-destructive">{errors.board12th}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stream">
              Stream <span className="text-destructive">*</span>
            </Label>
            <Select value={data.stream} onValueChange={(value) => updateData({ stream: value })}>
              <SelectTrigger className={errors.stream ? "border-destructive" : ""}>
                <SelectValue placeholder="Select stream" />
              </SelectTrigger>
              <SelectContent>
                {streams.map((stream) => (
                  <SelectItem key={stream} value={stream}>
                    {stream}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stream && <p className="text-xs text-destructive">{errors.stream}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage12th">
              Percentage/CGPA <span className="text-destructive">*</span>
            </Label>
            <Input
              id="percentage12th"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={data.percentage12th}
              onChange={(e) => updateData({ percentage12th: e.target.value })}
              placeholder="e.g., 88.0"
              className={errors.percentage12th ? "border-destructive" : ""}
            />
            {errors.percentage12th && <p className="text-xs text-destructive">{errors.percentage12th}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearOfPassing12th">
              Year of Passing <span className="text-destructive">*</span>
            </Label>
            <Select value={data.yearOfPassing12th} onValueChange={(value) => updateData({ yearOfPassing12th: value })}>
              <SelectTrigger className={errors.yearOfPassing12th ? "border-destructive" : ""}>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.yearOfPassing12th && <p className="text-xs text-destructive">{errors.yearOfPassing12th}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
