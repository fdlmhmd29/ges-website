import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPreview() {
  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const featuredPosts = posts?.slice(0, 3) || [];

  return (
    <section id="blog" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Artikel & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dapatkan wawasan terbaru tentang tren lingkungan, regulasi, dan best practices dari para ahli
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="bg-gray-50 overflow-hidden hover:shadow-lg transition-shadow">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-green-light text-green-primary">
                    {post.category}
                  </Badge>
                  <span className="text-gray-500 text-sm flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {new Date(post.createdAt!).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link href={`/blog/${post.id}`} className="hover:text-green-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="text-green-primary hover:text-green-600 text-sm font-medium flex items-center"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-green-primary text-white hover:bg-green-600">
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
