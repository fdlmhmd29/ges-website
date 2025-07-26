import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import BlogPreview from "@/components/blog-preview";
import ClientLogosCarousel from "@/components/client-logos-carousel";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <ClientLogosCarousel />
      <BlogPreview />
      <Contact />
      <Footer />
    </div>
  );
}
