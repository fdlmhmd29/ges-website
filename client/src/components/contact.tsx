import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  company: z.string().optional(),
  service: z.string().min(1, "Pilih layanan yang dibutuhkan"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactForm) => apiRequest("POST", "/api/contact", data),
    onSuccess: async (response) => {
      const result = await response.json();
      toast({
        title: "Berhasil!",
        description: result.message,
      });
      reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const serviceValue = watch("service");

  return (
    <section id="contact" className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Siap membantu Anda mencapai target keberlanjutan lingkungan. Konsultasikan kebutuhan Anda dengan tim ahli kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-primary rounded-lg flex items-center justify-center">
                    <MapPin className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Alamat Kantor</h3>
                    <p className="text-gray-600">Jl. Gatot Subroto No. 123, Jakarta Selatan 12950</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-primary rounded-lg flex items-center justify-center">
                    <Phone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telepon</h3>
                    <p className="text-gray-600">+62 21 5555 0123</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-primary rounded-lg flex items-center justify-center">
                    <Mail className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@greenfieldenv.co.id</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-primary rounded-lg flex items-center justify-center">
                    <Clock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 08:00 - 17:00 WIB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Konsultasi Gratis</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 812 3456 7890"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Perusahaan</Label>
                    <Input
                      id="company"
                      placeholder="Nama perusahaan"
                      {...register("company")}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="service">Layanan yang Dibutuhkan</Label>
                  <Select value={serviceValue} onValueChange={(value) => setValue("service", value)}>
                    <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                      <SelectValue placeholder="Pilih layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Environmental Impact Assessment">Environmental Impact Assessment</SelectItem>
                      <SelectItem value="Water & Waste Management">Water & Waste Management</SelectItem>
                      <SelectItem value="Air Quality Management">Air Quality Management</SelectItem>
                      <SelectItem value="Sustainability Consulting">Sustainability Consulting</SelectItem>
                      <SelectItem value="Ecosystem Restoration">Ecosystem Restoration</SelectItem>
                      <SelectItem value="Environmental Auditing">Environmental Auditing</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-sm text-red-500 mt-1">{errors.service.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Ceritakan tentang kebutuhan proyek Anda..."
                    {...register("message")}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-primary text-white hover:bg-green-600"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
