import { AdmissionForm } from "@/components/admission-form"
import { Header } from "@/components/header"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Apply for Admission</h1>
              <p className="text-muted-foreground">Complete all steps to submit your application</p>
            </div>
            <AdmissionForm />
          </div>
        </div>
      </main>
    </div>
  )
}
