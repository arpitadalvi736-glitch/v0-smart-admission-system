import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, ArrowRight } from "lucide-react"

interface SuccessScreenProps {
  applicationId: string
}

export function SuccessScreen({ applicationId }: SuccessScreenProps) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Application Submitted Successfully!</h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Your application has been received. You can track your application status using the ID below.
      </p>

      <div className="inline-block px-6 py-3 rounded-lg bg-muted mb-8">
        <p className="text-sm text-muted-foreground mb-1">Application ID</p>
        <p className="text-2xl font-mono font-bold text-foreground">{applicationId}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="outline" asChild>
          <Link href="#">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Link>
        </Button>
        <Button asChild>
          <Link href="/student/dashboard">
            Go to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 p-6 rounded-lg bg-muted/50 max-w-lg mx-auto text-left">
        <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </span>
            Your documents will be verified within 3-5 business days
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </span>
            You will receive email updates on your application status
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </span>
            Selection results will be announced based on eligibility criteria
          </li>
        </ul>
      </div>
    </div>
  )
}
