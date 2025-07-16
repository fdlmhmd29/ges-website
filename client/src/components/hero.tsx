import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-20 pb-16 lg:pt-24 lg:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Solusi Lingkungan{" "}
              <span className="text-green-primary">Berkelanjutan</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              PT Greenfield Environment Solution adalah perusahaan konsultan lingkungan terdepan yang membantu bisnis dan organisasi mencapai keberlanjutan lingkungan melalui layanan profesional yang komprehensif.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={scrollToContact}
                className="bg-green-primary text-white hover:bg-green-600"
              >
                Mulai Konsultasi
              </Button>
              <Button
                variant="outline"
                onClick={scrollToServices}
                className="border-green-primary text-green-primary hover:bg-green-50"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-primary">500+</p>
                <p className="text-sm text-gray-600">Proyek Selesai</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-primary">15+</p>
                <p className="text-sm text-gray-600">Tahun Pengalaman</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-primary">98%</p>
                <p className="text-sm text-gray-600">Kepuasan Klien</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern environmental consulting office"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">ISO 14001 Certified</p>
                  <p className="text-sm text-gray-600">Environmental Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
