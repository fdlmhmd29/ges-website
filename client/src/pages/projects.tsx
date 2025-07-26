import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'wouter'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarDays, Users, Clock, Building, ArrowRight } from 'lucide-react'
import type { Project, Service } from '@shared/schema'

export default function Projects() {
  const [sortBy, setSortBy] = useState('completedAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterService, setFilterService] = useState<string>('all')

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', sortBy, sortOrder],
    queryFn: async () => {
      const response = await fetch(`/api/projects?sortBy=${sortBy}&sortOrder=${sortOrder}`)
      return response.json()
    },
  })

  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  })

  const filteredProjects = projects?.filter(project => 
    filterService === 'all' || project.serviceId === parseInt(filterService)
  ) || []

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
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
              Proyek yang Telah Diselesaikan
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Portfolio proyek konsultasi lingkungan PT Greenfield Environment Solution
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-green-700 text-white">
                {filteredProjects.length}+ Proyek Selesai
              </Badge>
              <Badge variant="secondary" className="bg-green-700 text-white">
                98% Tingkat Kepuasan
              </Badge>
              <Badge variant="secondary" className="bg-green-700 text-white">
                15+ Tahun Pengalaman
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filter by Service:</label>
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {services?.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completedAt">Completion Date</SelectItem>
                    <SelectItem value="createdAt">Created Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Order:</label>
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredProjects.length} of {projects?.length || 0} projects
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="h-full hover:shadow-lg transition-shadow">
                  {project.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">
                        {services?.find(s => s.id === project.serviceId)?.name || 'Unknown Service'}
                      </Badge>
                      {project.completedAt && (
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {new Date(project.completedAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short'
                          })}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.shortDescription}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <Building className="h-4 w-4 mr-2 text-green-600" />
                        <span className="font-medium">Client:</span>
                        <span className="ml-1">{project.client}</span>
                      </div>
                      
                      {project.duration && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-green-600" />
                          <span className="font-medium">Duration:</span>
                          <span className="ml-1">{project.duration}</span>
                        </div>
                      )}
                      
                      {project.teamSize && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Users className="h-4 w-4 mr-2 text-green-600" />
                          <span className="font-medium">Team Size:</span>
                          <span className="ml-1">{project.teamSize} people</span>
                        </div>
                      )}
                    </div>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        // Open project details in modal or navigate to detail page
                        // For now, we'll show an alert with project details
                        alert(`Project Details:\n\n${project.description}\n\nChallenges: ${project.challenges}\n\nResults: ${project.results}`)
                      }}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Siap Memulai Proyek Anda?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Konsultasikan kebutuhan proyek lingkungan Anda dengan tim ahli kami
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Hubungi Kami Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}