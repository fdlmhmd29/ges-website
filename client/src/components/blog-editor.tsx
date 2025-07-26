import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getStoredAuth } from "@/lib/auth";
import RichTextEditor from "./rich-text-editor";
import { insertBlogPostSchema } from "@shared/schema";
import { X, Save, Eye } from "lucide-react";
import type { BlogPost, Category } from "@shared/schema";

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}

type BlogPostForm = {
  title: string;
  content: string;
  excerpt: string;
  authorId: number;
  categoryId: number;
  imageUrl: string;
  published: boolean;
};

export default function BlogEditor({ post, onClose, onSaved }: BlogEditorProps) {
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const user = getStoredAuth();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostForm>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      authorId: post?.authorId || user?.id || 1,
      categoryId: post?.categoryId || categories?.[0]?.id || 1,
      imageUrl: post?.imageUrl || "",
      published: post?.published || false,
    },
  });

  const formData = watch();

  const createMutation = useMutation({
    mutationFn: (data: BlogPostForm) => apiRequest("POST", "/api/admin/blog/posts", data),
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Artikel berhasil dibuat",
      });
      onSaved();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal membuat artikel",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: BlogPostForm) => apiRequest("PUT", `/api/admin/blog/posts/${post?.id}`, data),
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Artikel berhasil diperbarui",
      });
      onSaved();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal memperbarui artikel",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogPostForm) => {
    if (post) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                {post ? "Edit Artikel" : "Artikel Baru"}
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {isPreview ? "Edit" : "Preview"}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
                className="bg-green-primary hover:bg-green-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isPending ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {isPreview ? (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <span className="bg-green-light text-green-primary px-3 py-1 rounded-full text-sm font-medium">
                    {formData.category}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {formData.title}
                </h1>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{formData.author}</p>
                    <p className="text-sm text-gray-600">Environmental Consultant</p>
                  </div>
                </div>
                
                {formData.imageUrl && (
                  <div className="mb-8">
                    <img 
                      src={formData.imageUrl} 
                      alt={formData.title}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 mb-6 font-medium">
                    {formData.excerpt}
                  </p>
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {formData.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter article title"
                      {...register("title")}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of the article"
                      rows={3}
                      {...register("excerpt")}
                      className={errors.excerpt ? "border-red-500" : ""}
                    />
                    {errors.excerpt && (
                      <p className="text-sm text-red-500 mt-1">{errors.excerpt.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'Unknown'}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-sm text-gray-500 mt-1">Author is set based on logged in user</p>
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.categoryId?.toString()} 
                        onValueChange={(value) => setValue("categoryId", parseInt(value))}
                      >
                        <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.categoryId && (
                        <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      {...register("imageUrl")}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setValue("published", checked)}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="content">Article Content</Label>
                    <RichTextEditor
                      content={formData.content}
                      onChange={(content) => setValue("content", content)}
                      placeholder="Write your article content here..."
                    />
                    {errors.content && (
                      <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-green-primary hover:bg-green-600 text-white"
                >
                  {isPending ? "Saving..." : post ? "Update" : "Create"} Article
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
