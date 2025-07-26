import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'wouter'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Leaf, Droplets, Wind, Recycle, CheckCircle } from 'lucide-react'
import type { Service, Project } from '@shared/schema'

const iconMap = {
  'Leaf': Leaf,
  'Droplets': Droplets,
  'Wind': Wind,
  'Recycle': Recycle,
}

export default function ServiceDetail() {
  const { slug } = useParams()
  
  const { data: service, isLoading: serviceLoading } = useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
  })

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  })

  // Filter projects by service
  const serviceProjects = projects?.filter(project => project.serviceId === service?.id) || []

  if (serviceLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <Link href="/services">
              <Button variant="outline">Back to Services</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Leaf

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Service Header */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/services">
              <Button variant="ghost" className="text-white hover:bg-green-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-700 rounded-lg">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {service.name}
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Detail Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-green max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </CardContent>
              </Card>

              {/* Service Image */}
              {service.imageUrl && (
                <Card className="mt-8">
                  <CardContent className="p-0">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Related Projects */}
              {serviceProjects.length > 0 && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Proyek Terkait</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceProjects.slice(0, 4).map((project) => (
                        <div key={project.id} className="border rounded-lg p-4">
                          {project.imageUrl && (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-32 object-cover rounded mb-3"
                            />
                          )}
                          <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{project.shortDescription}</p>
                          <p className="text-sm text-green-600 font-medium">Client: {project.client}</p>
                        </div>
                      ))}
                    </div>
                    {serviceProjects.length > 4 && (
                      <div className="mt-4 text-center">
                        <Link href="/projects">
                          <Button variant="outline">
                            Lihat Semua Proyek
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Features */}
              {service.features && service.features.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Fitur Utama</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA */}
              <Card>
                <CardHeader>
                  <CardTitle>Tertarik dengan layanan ini?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Konsultasikan kebutuhan proyek Anda dengan tim ahli kami
                  </p>
                  <Link href="/#contact">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Hubungi Kami
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Statistik Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Proyek</span>
                      <span className="font-semibold">{serviceProjects.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Klien Puas</span>
                      <span className="font-semibold">98%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Waktu Rata-rata</span>
                      <span className="font-semibold">4-6 bulan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}