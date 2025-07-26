import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useQuery } from '@tanstack/react-query'
import type { ClientLogo } from '@shared/schema'

export default function ClientLogosCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  const { data: logos } = useQuery<ClientLogo[]>({
    queryKey: ['/api/client-logos'],
  })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi, logos])

  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Klien yang Mempercayai Kami
          </h2>
          <p className="text-lg text-gray-600">
            Dipercaya oleh perusahaan terkemuka di Indonesia
          </p>
        </div>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex-[0_0_50%] min-w-0 md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] pl-4"
              >
                <div className="bg-gray-50 rounded-lg p-6 h-24 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  {logo.websiteUrl ? (
                    <a
                      href={logo.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={logo.logoUrl}
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </a>
                  ) : (
                    <img
                      src={logo.logoUrl}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}