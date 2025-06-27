import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Clock, Zap, Heart } from "lucide-react"

export default function SizeGuidePage() {
  const sizeOptions = [
    {
      size: "5ml",
      type: "Travel Size",
      description: "Perfect for trying new fragrances or travel",
      sprays: "50-70 sprays",
      duration: "1-2 weeks daily use",
      icon: Zap,
      price: "$15-25",
    },
    {
      size: "10ml",
      type: "Sample Size",
      description: "Great for testing before committing to full size",
      sprays: "100-140 sprays",
      duration: "3-4 weeks daily use",
      icon: Droplets,
      price: "$25-35",
    },
    {
      size: "30ml",
      type: "Small",
      description: "Ideal for occasional use or trying new scents",
      sprays: "300-420 sprays",
      duration: "2-3 months daily use",
      icon: Heart,
      price: "$45-75",
    },
    {
      size: "50ml",
      type: "Standard",
      description: "Most popular size, perfect for regular use",
      sprays: "500-700 sprays",
      duration: "4-6 months daily use",
      icon: Clock,
      price: "$65-120",
    },
    {
      size: "100ml",
      type: "Large",
      description: "Best value for your favorite fragrance",
      sprays: "1000-1400 sprays",
      duration: "8-12 months daily use",
      icon: Clock,
      price: "$95-200",
    },
  ]

  const concentrationGuide = [
    {
      type: "Parfum (Extrait)",
      concentration: "20-40%",
      longevity: "8-12 hours",
      sillage: "Intimate",
      description: "Highest concentration, most luxurious and long-lasting",
    },
    {
      type: "Eau de Parfum (EDP)",
      concentration: "15-20%",
      longevity: "6-8 hours",
      sillage: "Moderate",
      description: "Perfect balance of longevity and projection",
    },
    {
      type: "Eau de Toilette (EDT)",
      concentration: "5-15%",
      longevity: "3-5 hours",
      sillage: "Light to Moderate",
      description: "Fresh and light, ideal for daytime wear",
    },
    {
      type: "Eau de Cologne (EDC)",
      concentration: "2-5%",
      longevity: "2-3 hours",
      sillage: "Light",
      description: "Refreshing and invigorating, perfect for hot weather",
    },
  ]

  const usageTips = [
    {
      title: "Daily Use",
      description: "2-3 sprays per day",
      recommendation: "50ml bottle lasts 4-6 months",
    },
    {
      title: "Occasional Use",
      description: "2-3 times per week",
      recommendation: "30ml bottle lasts 6-8 months",
    },
    {
      title: "Special Occasions",
      description: "Once a week or less",
      recommendation: "30ml bottle lasts 1-2 years",
    },
    {
      title: "Collection Building",
      description: "Multiple fragrances in rotation",
      recommendation: "Start with 30ml sizes",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="luxury-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Fragrance Size Guide</h1>
            <p className="text-xl text-gray-600">Choose the perfect size for your lifestyle and fragrance needs</p>
          </div>
        </section>

        {/* Size Options */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bottle Sizes</h2>
              <p className="text-lg text-gray-600">Find the right size for your fragrance journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
              {sizeOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Card key={option.size} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{option.size}</CardTitle>
                      <Badge variant="secondary">{option.type}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{option.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Sprays:</span>
                          <span className="font-medium">{option.sprays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium">{option.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price Range:</span>
                          <span className="font-medium">{option.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Concentration Guide */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Fragrance Concentrations</h2>
                <p className="text-lg text-gray-600">Understanding the different types of fragrances</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {concentrationGuide.map((concentration) => (
                  <Card key={concentration.type}>
                    <CardHeader>
                      <CardTitle className="text-xl">{concentration.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-gray-600">{concentration.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Concentration</span>
                          <span className="font-medium">{concentration.concentration}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Longevity</span>
                          <span className="font-medium">{concentration.longevity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Sillage</span>
                          <span className="font-medium">{concentration.sillage}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Usage Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Usage Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {usageTips.map((tip) => (
                      <div key={tip.title}>
                        <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                        <p className="text-gray-600 text-sm mb-1">{tip.description}</p>
                        <p className="text-sm font-medium text-blue-600">{tip.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Application Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How Many Sprays?</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Light fragrances (EDT): 3-4 sprays</li>
                      <li>• Medium fragrances (EDP): 2-3 sprays</li>
                      <li>• Strong fragrances (Parfum): 1-2 sprays</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Where to Apply</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Pulse points (wrists, neck)</li>
                      <li>• Behind ears</li>
                      <li>• Inside elbows</li>
                      <li>• On clothing (test first)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best Practices</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Don't rub after applying</li>
                      <li>• Apply to clean, moisturized skin</li>
                      <li>• Store in cool, dark places</li>
                      <li>• Rotate fragrances to prevent nose blindness</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
