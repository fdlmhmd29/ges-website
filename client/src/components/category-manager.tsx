import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertCategorySchema } from "@shared/schema";
import type { Category } from "@shared/schema";
import { X, Edit, Trash2 } from "lucide-react";

interface CategoryManagerProps {
  onClose: () => void;
}

type CategoryForm = {
  name: string;
  description: string;
  slug: string;
};

export default function CategoryManager({ onClose }: CategoryManagerProps) {
  const { toast } = useToast();
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  const [editing, setEditing] = useState<Category | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: { name: "", description: "", slug: "" },
  });

  const createMutation = useMutation({
    mutationFn: (data: CategoryForm) =>
      apiRequest("POST", "/api/admin/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Berhasil", description: "Kategori berhasil dibuat" });
      reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal membuat kategori",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CategoryForm) =>
      apiRequest("PUT", `/api/admin/categories/${editing?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Berhasil", description: "Kategori berhasil diperbarui" });
      setEditing(null);
      reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal memperbarui kategori",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/admin/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Berhasil", description: "Kategori berhasil dihapus" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal menghapus kategori",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CategoryForm) => {
    if (editing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (category: Category) => {
    setEditing(category);
    reset({
      name: category.name,
      description: category.description || "",
      slug: category.slug,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      deleteMutation.mutate(id);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Manage Categories
            </h1>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Category" : "New Category"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  className={errors.slug ? "border-red-500" : ""}
                />
                {errors.slug && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                {editing && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-green-primary hover:bg-green-600 text-white"
                >
                  {isPending ? "Saving..." : editing ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories ({categories?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {!categories || categories.length === 0 ? (
              <p className="text-gray-600">No categories found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {cat.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {cat.slug}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(cat)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(cat.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
