import { Card, CardContent } from "@/components/ui/card";
import { 
  Leaf, 
  Droplets, 
  Wind, 
  Recycle, 
  Sprout, 
  TrendingUp,
  Check
} from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Environmental Impact Assessment",
    description: "Evaluasi menyeluruh dampak lingkungan untuk proyek pembangunan dan industri",
    features: ["Analisis AMDAL", "Studi Kelayakan", "Monitoring & Evaluasi"]
  },
  {
    icon: Droplets,
    title: "Water & Waste Management",
    description: "Solusi pengelolaan air dan limbah yang efisien dan ramah lingkungan",
    features: ["Sistem Pengolahan Air", "Manajemen Limbah", "Daur Ulang"]
  },
  {
    icon: Wind,
    title: "Air Quality Management",
    description: "Pemantauan dan pengendalian kualitas udara untuk lingkungan yang sehat",
    features: ["Monitoring Emisi", "Sistem Kontrol", "Audit Kualitas Udara"]
  },
  {
    icon: Recycle,
    title: "Sustainability Consulting",
    description: "Konsultasi strategis untuk implementasi praktik bisnis berkelanjutan",
    features: ["Green Building", "Carbon Footprint", "ESG Strategy"]
  },
  {
    icon: Sprout,
    title: "Ecosystem Restoration",
    description: "Pemulihan dan rehabilitasi ekosistem yang terdampak aktivitas industri",
    features: ["Revegetasi", "Konservasi Tanah", "Biodiversity Protection"]
  },
  {
    icon: TrendingUp,
    title: "Environmental Auditing",
    description: "Audit komprehensif untuk memastikan kepatuhan terhadap regulasi lingkungan",
    features: ["Compliance Audit", "Performance Review", "Risk Assessment"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Layanan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan solusi lingkungan yang komprehensif untuk membantu bisnis Anda mencapai target keberlanjutan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-primary rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
