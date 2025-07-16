import { Link } from "wouter";
import { Leaf, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-primary rounded-lg flex items-center justify-center">
                <Leaf className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold">PT Greenfield</h3>
                <p className="text-sm text-gray-400">Environment Solution</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Solusi lingkungan terpercaya untuk masa depan yang berkelanjutan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Environmental Impact Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Water & Waste Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Air Quality Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability Consulting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Tim</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+62 21 5555 0123</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@greenfieldenv.co.id</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/admin/login" className="text-green-primary hover:text-green-400 text-sm">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 PT Greenfield Environment Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
