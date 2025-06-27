import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Leaf, Star } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest ingredients from around the world to create exceptional fragrances.",
    },
    {
      icon: Heart,
      title: "Passion for Perfume",
      description: "Our team of expert perfumers brings decades of experience and artistry to every bottle.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "We're committed to ethical sourcing and environmentally responsible production methods.",
    },
    {
      icon: Star,
      title: "Customer Excellence",
      description: "Your satisfaction is our priority, with personalized service and expert guidance.",
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-20"
          style={{
            backgroundImage: `url('/assets/images.jpeg')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/40"></div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Luxe Fragrances
            </h1>
            <p className="text-xl text-gray-800 leading-relaxed">
              For over two decades, we've been crafting exceptional fragrances that capture the essence of luxury and sophistication.
              Our passion for perfumery drives us to create scents that tell stories and evoke emotions.
            </p>
          </div>
        </section>


        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2000 by master perfumer Isabella Laurent, Luxe Fragrances began as a small atelier in the
                    heart of Paris. With a vision to create fragrances that transcend time and trends, Isabella set out
                    to craft scents that would become personal signatures for those who wear them.
                  </p>
                  <p>
                    Today, we continue to honor that original vision while embracing innovation and sustainability. Each
                    fragrance in our collection is meticulously crafted using traditional techniques combined with
                    modern artistry, ensuring every bottle contains a piece of our passion and expertise.
                  </p>
                  <p>
                    From our signature luxury collection to our fresh everyday scents, we believe that fragrance is more
                    than just a product – it's an expression of identity, a memory maker, and a confidence booster.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/assets/istockphoto-1540766473-612x612.jpg"
                  alt="Our Story"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do, from sourcing ingredients to serving our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our passionate team of experts brings together decades of experience in perfumery, design, and customer
                service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Raunak Trpathi",
                  role: "Founder & Master Perfumer",
                  image: "/assets/stock-photo-serious-thoughtful-young-indian-man-indoor-portrait-pensive-dreamy-handsome-businessman-2315729055.jpg",
                },
                {
                  name: "Sachin Jain",
                  role: "Head of Product Development",
                  image: "/assets/team2.jpeg",
                },
                {
                  name: "Karan singh",
                  role: "Customer Experience Director",
                  image: "/assets/team3.jpeg",
                },
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
