import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Environmental team working on sustainability project"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Tentang PT Greenfield Environment Solution
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Dengan pengalaman lebih dari 15 tahun, kami telah menjadi mitra terpercaya untuk solusi lingkungan di Indonesia. Tim ahli kami terdiri dari profesional bersertifikat yang berdedikasi untuk menciptakan masa depan yang berkelanjutan.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white text-xs" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Keahlian Profesional</h4>
                  <p className="text-gray-600">Tim ahli bersertifikat dengan pengalaman internasional</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white text-xs" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Solusi Inovatif</h4>
                  <p className="text-gray-600">Menggunakan teknologi terdepan untuk hasil optimal</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white text-xs" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Komitmen Berkelanjutan</h4>
                  <p className="text-gray-600">Fokus pada dampak jangka panjang untuk lingkungan</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-4 bg-white">
                <CardContent className="p-0">
                  <p className="text-2xl font-bold text-green-primary">500+</p>
                  <p className="text-sm text-gray-600">Proyek Berhasil</p>
                </CardContent>
              </Card>
              <Card className="text-center p-4 bg-white">
                <CardContent className="p-0">
                  <p className="text-2xl font-bold text-green-primary">50+</p>
                  <p className="text-sm text-gray-600">Klien Korporat</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
