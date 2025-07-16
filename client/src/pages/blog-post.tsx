import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, User, ArrowLeft, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog/posts", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-4 w-96 mb-8" />
            <Skeleton className="h-96 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
              <p className="text-gray-600 mb-8">Artikel yang Anda cari tidak ditemukan atau telah dihapus.</p>
              <Link href="/blog">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link href="/blog">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Blog
            </Button>
          </Link>

          <article>
            <header className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-green-light text-green-primary">
                  {post.category}
                </Badge>
                <span className="text-gray-500 text-sm flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {new Date(post.createdAt!).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-600">Environmental Consultant</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {post.imageUrl && (
              <div className="mb-8">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 mb-6 font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Butuh Konsultasi Lingkungan?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim ahli kami siap membantu Anda mencapai target keberlanjutan lingkungan
            </p>
            <Link href="/#contact">
              <Button className="bg-green-primary hover:bg-green-600 text-white">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
