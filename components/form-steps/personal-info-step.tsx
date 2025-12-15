"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { categories } from "@/lib/data"

interface PersonalInfoStepProps {
  data: {
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
  updateData: (data: Partial<PersonalInfoStepProps["data"]>) => void
  errors: Record<string, string>
}

export function PersonalInfoStep({ data, updateData, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Personal Information</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your basic details accurately. All fields marked with * are required.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            placeholder="Enter first name (letters only)"
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="Enter last name (letters only)"
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="yourname@example.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10)
              updateData({ phone: value })
            }}
            placeholder="10-digit mobile number"
            maxLength={10}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            className={errors.dateOfBirth ? "border-destructive" : ""}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split("T")[0]}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 30)).toISOString().split("T")[0]}
          />
          {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">
            Gender <span className="text-destructive">*</span>
          </Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select value={data.category} onValueChange={(value) => updateData({ category: value })}>
            <SelectTrigger className={errors.category ? "border-destructive" : ""}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Address <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="address"
          value={data.address}
          onChange={(e) => updateData({ address: e.target.value })}
          placeholder="Enter your complete address (house no, street, area)"
          rows={3}
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            placeholder="Enter city"
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">
            State <span className="text-destructive">*</span>
          </Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => updateData({ state: e.target.value })}
            placeholder="Enter state"
            className={errors.state ? "border-destructive" : ""}
          />
          {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">
            Pincode <span className="text-destructive">*</span>
          </Label>
          <Input
            id="pincode"
            value={data.pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 6)
              updateData({ pincode: value })
            }}
            placeholder="6-digit pincode"
            maxLength={6}
            className={errors.pincode ? "border-destructive" : ""}
          />
          {errors.pincode && <p className="text-xs text-destructive">{errors.pincode}</p>}
        </div>
      </div>
    </div>
  )
}
