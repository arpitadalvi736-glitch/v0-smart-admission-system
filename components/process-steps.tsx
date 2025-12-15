import { FileText, CheckCircle, Award, GraduationCap, ArrowDown } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Apply",
    description: "Fill out the online application form with your personal and academic details",
    step: "01",
  },
  {
    icon: CheckCircle,
    title: "Verify",
    description: "Upload required documents and get them verified by our team",
    step: "02",
  },
  {
    icon: Award,
    title: "Select",
    description: "Based on eligibility, receive your selection status and course allocation",
    step: "03",
  },
  {
    icon: GraduationCap,
    title: "Admit",
    description: "Complete the admission process and begin your academic journey",
    step: "04",
  },
]

export function ProcessSteps() {
  return (
    <section id="process" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple 4-Step Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined admission process makes it easy for you to apply and track your application status.
          </p>
        </div>

        <div className="flex flex-col items-center gap-0 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="w-full">
              <div className="relative group">
                <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">{step.step}</div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-primary/30" />
                    <ArrowDown className="h-5 w-5 text-primary/50" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
