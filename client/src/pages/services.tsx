import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Droplets, Wind, Recycle } from 'lucide-react'
import type { Service } from '@shared/schema'

const iconMap = {
  'Leaf': Leaf,
  'Droplets': Droplets,
  'Wind': Wind,
  'Recycle': Recycle,
}

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Layanan Konsultasi Lingkungan
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Solusi komprehensif untuk kebutuhan lingkungan perusahaan Anda
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-green-700 text-white">
                ISO 14001 Certified
              </Badge>
              <Badge variant="secondary" className="bg-green-700 text-white">
                15+ Years Experience
              </Badge>
              <Badge variant="secondary" className="bg-green-700 text-white">
                100+ Projects Completed
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-gray-600">
              Kami menyediakan layanan konsultasi lingkungan yang komprehensif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services?.map((service) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Leaf
              return (
                <Card key={service.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="outline">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <Link href={`/services/${service.slug}`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Pelajari Lebih Lanjut
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Butuh Konsultasi Khusus?
              </h3>
              <p className="text-gray-600 mb-6">
                Tim ahli kami siap membantu Anda menemukan solusi yang tepat
              </p>
              <Link href="/#contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Hubungi Kami Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}