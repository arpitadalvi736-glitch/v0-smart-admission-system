import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProcessSteps } from "@/components/process-steps"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProcessSteps />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}
