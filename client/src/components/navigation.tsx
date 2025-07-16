import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-primary rounded-lg flex items-center justify-center">
              <Leaf className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PT Greenfield</h1>
              <p className="text-xs text-gray-500">Environment Solution</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-green-primary transition-colors">
              Beranda
            </Link>
            {location === "/" && (
              <>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-600 hover:text-green-primary transition-colors"
                >
                  Layanan
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-600 hover:text-green-primary transition-colors"
                >
                  Tentang
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-600 hover:text-green-primary transition-colors"
                >
                  Kontak
                </button>
              </>
            )}
            <Link href="/blog" className="text-gray-600 hover:text-green-primary transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              className="hidden md:block bg-green-primary text-white hover:bg-green-600"
              onClick={() => scrollToSection("contact")}
            >
              Konsultasi Gratis
            </Button>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="text-gray-600" />
              ) : (
                <Menu className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-green-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-green-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              {location === "/" && (
                <>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-600 hover:text-green-primary transition-colors text-left"
                  >
                    Layanan
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-600 hover:text-green-primary transition-colors text-left"
                  >
                    Tentang
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-600 hover:text-green-primary transition-colors text-left"
                  >
                    Kontak
                  </button>
                </>
              )}
              <Button
                className="bg-green-primary text-white hover:bg-green-600 text-left"
                onClick={() => scrollToSection("contact")}
              >
                Konsultasi Gratis
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
