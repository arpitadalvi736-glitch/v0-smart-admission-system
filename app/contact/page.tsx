import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "admissions@university.edu",
      subtext: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtext: "Mon-Fri, 9am-5pm EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 University Ave",
      subtext: "New York, NY 10001",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday - Friday",
      subtext: "9:00 AM - 5:00 PM EST",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about admissions? We're here to help. Reach out to our team and we'll get back to you as
              soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                    <p className="text-foreground font-medium">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.subtext}</p>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-slate-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
