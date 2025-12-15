import { Brain, Bell, BarChart3, Shield, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Smart Shortlisting",
    description: "AI-powered eligibility checking automatically shortlists qualified candidates based on criteria.",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Get instant notifications on your application status at every stage of the process.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics for administrators to track applications and make informed decisions.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and encryption standards.",
  },
  {
    icon: Clock,
    title: "Auto-Save Drafts",
    description: "Never lose your progress. Your application is automatically saved as you fill it out.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Our support team is available to help you throughout the admission process.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Smart Features for Modern Admissions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powered by intelligent automation to make the admission process efficient and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
