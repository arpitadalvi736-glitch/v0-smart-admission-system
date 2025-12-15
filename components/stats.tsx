const stats = [
  { value: "15,000+", label: "Applications Processed" },
  { value: "50+", label: "Partner Institutions" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24hrs", label: "Average Response Time" },
]

export function Stats() {
  return (
    <section id="stats" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
