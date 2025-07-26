import { db } from "./db";
import {
  users,
  categories,
  services,
  clientLogos,
  projects,
  blogPosts,
} from "@shared/schema";
import bcrypt from "bcryptjs";

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Clear existing data
    await db.delete(blogPosts);
    await db.delete(projects);
    await db.delete(clientLogos);
    await db.delete(services);
    await db.delete(categories);
    await db.delete(users);

    // Create admin user
    const hashedPassword = await bcrypt.hash("greenfield2023", 10);
    const [adminUser] = await db
      .insert(users)
      .values({
        username: "admin",
        email: "admin@greenfieldenv.co.id",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        isActive: true,
      })
      .returning();

    // Create sample users
    const [editorUser] = await db
      .insert(users)
      .values({
        username: "sarah.putri",
        email: "sarah.putri@greenfieldenv.co.id",
        password: await bcrypt.hash("password123", 10),
        firstName: "Sarah",
        lastName: "Putri",
        role: "editor",
        isActive: true,
        invitedBy: adminUser.id,
      })
      .returning();

    const [writerUser] = await db
      .insert(users)
      .values({
        username: "bambang.sutrisno",
        email: "bambang.sutrisno@greenfieldenv.co.id",
        password: await bcrypt.hash("password123", 10),
        firstName: "Bambang",
        lastName: "Sutrisno",
        role: "editor",
        isActive: true,
        invitedBy: adminUser.id,
      })
      .returning();

    // Create categories
    const [greenBuildingCategory] = await db
      .insert(categories)
      .values({
        name: "Green Building",
        description: "Sustainable building practices and green architecture",
        slug: "green-building",
      })
      .returning();

    const [wasteManagementCategory] = await db
      .insert(categories)
      .values({
        name: "Waste Management",
        description: "Waste reduction, recycling, and disposal solutions",
        slug: "waste-management",
      })
      .returning();

    const [monitoringCategory] = await db
      .insert(categories)
      .values({
        name: "Environmental Monitoring",
        description: "Environmental monitoring and assessment",
        slug: "environmental-monitoring",
      })
      .returning();

    const [sustainabilityCategory] = await db
      .insert(categories)
      .values({
        name: "Sustainability",
        description: "Sustainable business practices and ESG",
        slug: "sustainability",
      })
      .returning();

    // Create services
    const [eiaService] = await db
      .insert(services)
      .values({
        name: "Environmental Impact Assessment",
        description:
          "Comprehensive environmental impact assessment services for development projects, including AMDAL studies, feasibility analysis, and environmental monitoring programs.",
        shortDescription:
          "Evaluasi menyeluruh dampak lingkungan untuk proyek pembangunan dan industri",
        slug: "environmental-impact-assessment",
        icon: "Leaf",
        features: [
          "Analisis AMDAL",
          "Studi Kelayakan",
          "Monitoring & Evaluasi",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      })
      .returning();

    const [waterService] = await db
      .insert(services)
      .values({
        name: "Water & Waste Management",
        description:
          "Advanced water treatment and waste management solutions, including wastewater treatment systems, solid waste management, and recycling programs.",
        shortDescription:
          "Solusi pengelolaan air dan limbah yang efisien dan ramah lingkungan",
        slug: "water-waste-management",
        icon: "Droplets",
        features: ["Sistem Pengolahan Air", "Manajemen Limbah", "Daur Ulang"],
        imageUrl:
          "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      })
      .returning();

    const [airService] = await db
      .insert(services)
      .values({
        name: "Air Quality Management",
        description:
          "Air quality monitoring and management services, including emission control systems, air pollution assessment, and indoor air quality solutions.",
        shortDescription:
          "Pemantauan dan pengendalian kualitas udara untuk lingkungan yang sehat",
        slug: "air-quality-management",
        icon: "Wind",
        features: [
          "Monitoring Emisi",
          "Sistem Kontrol",
          "Audit Kualitas Udara",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      })
      .returning();

    const [sustainabilityService] = await db
      .insert(services)
      .values({
        name: "Sustainability Consulting",
        description:
          "Strategic sustainability consulting services, including ESG strategy development, carbon footprint assessment, and sustainable business transformation.",
        shortDescription:
          "Konsultasi strategis untuk implementasi praktik bisnis berkelanjutan",
        slug: "sustainability-consulting",
        icon: "Recycle",
        features: ["Green Building", "Carbon Footprint", "ESG Strategy"],
        imageUrl:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      })
      .returning();

    // Create client logos
    await db.insert(clientLogos).values([
      {
        name: "PT Pertamina",
        logoUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
        websiteUrl: "https://pertamina.com",
        sortOrder: 1,
      },
      {
        name: "PT Unilever Indonesia",
        logoUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
        websiteUrl: "https://unilever.co.id",
        sortOrder: 2,
      },
      {
        name: "PT Semen Indonesia",
        logoUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
        websiteUrl: "https://semenindonesia.com",
        sortOrder: 3,
      },
      {
        name: "PT Astra International",
        logoUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
        websiteUrl: "https://astra.co.id",
        sortOrder: 4,
      },
      {
        name: "PT Bank Mandiri",
        logoUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
        websiteUrl: "https://bankmandiri.co.id",
        sortOrder: 5,
      },
      {
        name: "PT Telkom Indonesia",
        logoUrl:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
        websiteUrl: "https://telkom.co.id",
        sortOrder: 6,
      },
    ]);

    // Create sample projects
    await db.insert(projects).values([
      {
        title: "Green Building Certification for Jakarta Office Tower",
        description:
          "Comprehensive green building assessment and certification project for a 40-story office building in Jakarta Central Business District.",
        shortDescription:
          "Green building certification project for modern office tower",
        client: "PT Ciputra Development",
        serviceId: eiaService.id,
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        completedAt: new Date("2023-10-15"),
        duration: "8 months",
        teamSize: 12,
        technologies: [
          "LEED Certification",
          "Energy Modeling",
          "Indoor Air Quality Assessment",
        ],
        challenges:
          "Adapting international green building standards to Indonesian climate and regulations",
        results:
          "Achieved LEED Gold certification, 30% reduction in energy consumption",
      },
      {
        title: "Wastewater Treatment Plant for Manufacturing Facility",
        description:
          "Design and implementation of advanced wastewater treatment system for automotive manufacturing plant in Bekasi.",
        shortDescription: "Advanced wastewater treatment system implementation",
        client: "PT Astra Honda Motor",
        serviceId: waterService.id,
        imageUrl:
          "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        completedAt: new Date("2023-09-20"),
        duration: "6 months",
        teamSize: 8,
        technologies: [
          "Membrane Bioreactor",
          "Advanced Oxidation",
          "Sludge Treatment",
        ],
        challenges:
          "Meeting strict discharge standards while maintaining production efficiency",
        results:
          "99.5% pollution reduction, full compliance with environmental regulations",
      },
      {
        title: "Air Quality Monitoring System for Industrial Complex",
        description:
          "Installation and management of comprehensive air quality monitoring network for Cikarang Industrial Estate.",
        shortDescription: "Real-time air quality monitoring system",
        client: "Cikarang Industrial Estate",
        serviceId: airService.id,
        imageUrl:
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        completedAt: new Date("2023-11-30"),
        duration: "4 months",
        teamSize: 6,
        technologies: ["IoT Sensors", "Real-time Monitoring", "Data Analytics"],
        challenges:
          "Integrating diverse monitoring equipment into unified system",
        results:
          "24/7 monitoring capability, early warning system for air quality incidents",
      },
    ]);

    // Create blog posts
    await db.insert(blogPosts).values([
      {
        title:
          "Implementasi Green Building di Indonesia: Peluang dan Tantangan",
        content: `<p>Green building atau bangunan hijau merupakan konsep pembangunan berkelanjutan yang semakin penting di Indonesia. Dengan iklim tropis dan kepadatan penduduk yang tinggi, implementasi green building menjadi solusi untuk mengurangi dampak lingkungan dari sektor konstruksi.</p>

<h2>Peluang Green Building di Indonesia</h2>

<p>Indonesia memiliki potensi besar untuk mengembangkan green building, terutama dengan:</p>

<ul>
<li><strong>Regulasi yang mendukung:</strong> Pemerintah telah mengeluarkan berbagai regulasi yang mendorong pembangunan berkelanjutan</li>
<li><strong>Ketersediaan material lokal:</strong> Bahan bangunan ramah lingkungan tersedia secara lokal</li>
<li><strong>Kesadaran lingkungan:</strong> Meningkatnya kesadaran masyarakat akan pentingnya lingkungan</li>
</ul>

<h2>Tantangan yang Dihadapi</h2>

<p>Meskipun memiliki potensi besar, implementasi green building di Indonesia masih menghadapi beberapa tantangan:</p>

<ol>
<li><strong>Biaya awal yang tinggi:</strong> Investasi awal untuk green building masih dianggap mahal</li>
<li><strong>Keterbatasan SDM:</strong> Kurangnya tenaga ahli yang memahami konsep green building</li>
<li><strong>Sertifikasi:</strong> Proses sertifikasi yang kompleks dan memakan waktu</li>
</ol>

<h2>Solusi dan Rekomendasi</h2>

<p>Untuk mengatasi tantangan tersebut, beberapa solusi dapat diterapkan:</p>

<blockquote>
<p>"Investasi pada green building adalah investasi jangka panjang yang akan memberikan return yang berkelanjutan baik dari segi ekonomi maupun lingkungan."</p>
</blockquote>

<p>PT Greenfield Environment Solution telah membantu lebih dari 100 proyek green building di Indonesia, dengan tingkat kepuasan klien mencapai 98%. Kami menyediakan layanan konsultasi komprehensif mulai dari perencanaan hingga sertifikasi.</p>`,
        excerpt:
          "Explore bagaimana konsep green building dapat diterapkan di Indonesia dengan mempertimbangkan iklim tropis dan regulasi lokal",
        authorId: editorUser.id,
        categoryId: greenBuildingCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2023-12-15"),
      },
      {
        title: "Strategi Pengelolaan Limbah B3 untuk Industri Manufaktur",
        content: `<p>Limbah Bahan Berbahaya dan Beracun (B3) memerlukan penanganan khusus dalam industri manufaktur. Artikel ini membahas strategi komprehensif untuk mengelola limbah B3 sesuai dengan regulasi yang berlaku di Indonesia.</p>

<h2>Klasifikasi Limbah B3</h2>

<p>Limbah B3 dapat diklasifikasikan berdasarkan karakteristiknya:</p>

<table>
<tr>
<th>Karakteristik</th>
<th>Contoh Limbah</th>
<th>Industri Penghasil</th>
</tr>
<tr>
<td>Mudah Meledak</td>
<td>Solvent bekas</td>
<td>Farmasi, Cat</td>
</tr>
<tr>
<td>Beracun</td>
<td>Logam berat</td>
<td>Elektronik, Galvanis</td>
</tr>
<tr>
<td>Korosif</td>
<td>Asam sulfat</td>
<td>Pertambangan, Kimia</td>
</tr>
</table>

<h2>Regulasi Terkait</h2>

<p>Pengelolaan limbah B3 di Indonesia diatur dalam:</p>

<ul>
<li>PP No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup</li>
<li>Permen LHK No. 6 Tahun 2021 tentang Tata Cara dan Persyaratan Pengelolaan Limbah B3</li>
<li>Peraturan daerah setempat yang berlaku</li>
</ul>

<h2>Strategi Pengelolaan</h2>

<p>Strategi pengelolaan limbah B3 yang efektif meliputi:</p>

<h3>1. Minimisasi Limbah</h3>
<p>Mengurangi jumlah limbah B3 yang dihasilkan melalui:</p>
<ul>
<li>Substitusi bahan baku</li>
<li>Modifikasi proses produksi</li>
<li>Penggunaan teknologi bersih</li>
</ul>

<h3>2. Penyimpanan yang Aman</h3>
<p>Limbah B3 harus disimpan dengan memperhatikan:</p>
<ul>
<li>Kompatibilitas kimia</li>
<li>Kondisi penyimpanan (suhu, kelembaban)</li>
<li>Sistem keamanan dan monitoring</li>
</ul>

<h3>3. Pengolahan dan Pemanfaatan</h3>
<p>Opsi pengolahan limbah B3 meliputi:</p>
<ul>
<li>Recovery dan recycling</li>
<li>Treatment fisik-kimia</li>
<li>Thermal treatment</li>
<li>Solidifikasi/stabilisasi</li>
</ul>

<p>Implementasi strategi pengelolaan limbah B3 yang tepat tidak hanya memastikan kepatuhan regulasi, tetapi juga dapat memberikan manfaat ekonomi melalui recovery material dan efisiensi proses.</p>`,
        excerpt:
          "Panduan komprehensif untuk mengelola limbah berbahaya dan beracun (B3) sesuai dengan regulasi yang berlaku di Indonesia",
        authorId: writerUser.id,
        categoryId: wasteManagementCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2023-12-12"),
      },
      {
        title: "Teknologi IoT untuk Monitoring Lingkungan Real-time",
        content: `<p>Internet of Things (IoT) membuka peluang baru dalam monitoring lingkungan secara real-time. Teknologi ini memungkinkan pengumpulan data lingkungan yang akurat dan kontinyu untuk berbagai parameter.</p>

<h2>Komponen Sistem IoT untuk Monitoring Lingkungan</h2>

<p>Sistem IoT untuk monitoring lingkungan terdiri dari beberapa komponen utama:</p>

<h3>1. Sensor dan Perangkat Pengumpul Data</h3>
<ul>
<li><strong>Sensor kualitas udara:</strong> PM2.5, PM10, CO, NO2, SO2, O3</li>
<li><strong>Sensor kualitas air:</strong> pH, DO, COD, BOD, TSS, logam berat</li>
<li><strong>Sensor kebisingan:</strong> Sound level meter dengan analisis spektral</li>
<li><strong>Sensor meteorologi:</strong> Suhu, kelembaban, tekanan, arah angin</li>
</ul>

<h3>2. Sistem Komunikasi</h3>
<p>Data dari sensor dikirim melalui berbagai protokol komunikasi:</p>
<ul>
<li>WiFi untuk area dengan coverage internet</li>
<li>LoRaWAN untuk jangkauan luas dengan konsumsi daya rendah</li>
<li>4G/5G untuk aplikasi mobile dan real-time</li>
<li>Satelit untuk area terpencil</li>
</ul>

<h3>3. Platform Data dan Analytics</h3>
<p>Data yang terkumpul diolah menggunakan:</p>
<ul>
<li>Cloud computing untuk penyimpanan dan processing</li>
<li>Machine learning untuk prediksi dan anomaly detection</li>
<li>Dashboard interaktif untuk visualisasi data</li>
<li>API untuk integrasi dengan sistem lain</li>
</ul>

<h2>Manfaat Implementasi IoT</h2>

<p>Implementasi sistem IoT dalam monitoring lingkungan memberikan berbagai manfaat:</p>

<blockquote>
<p>"Dengan IoT, monitoring lingkungan menjadi lebih efisien, akurat, dan dapat memberikan early warning untuk mencegah dampak lingkungan yang lebih besar."</p>
</blockquote>

<h3>Manfaat Operasional</h3>
<ul>
<li><strong>Monitoring 24/7:</strong> Pengawasan kontinyu tanpa intervensi manual</li>
<li><strong>Data real-time:</strong> Informasi langsung untuk pengambilan keputusan cepat</li>
<li><strong>Efisiensi biaya:</strong> Mengurangi biaya operasional monitoring manual</li>
<li><strong>Akurasi tinggi:</strong> Minimalisir human error dalam pengumpulan data</li>
</ul>

<h3>Manfaat Strategis</h3>
<ul>
<li><strong>Compliance:</strong> Memastikan kepatuhan terhadap regulasi lingkungan</li>
<li><strong>Risk management:</strong> Identifikasi dini potensi masalah lingkungan</li>
<li><strong>Sustainability reporting:</strong> Data akurat untuk laporan keberlanjutan</li>
<li><strong>Stakeholder engagement:</strong> Transparansi informasi kepada masyarakat</li>
</ul>

<h2>Studi Kasus: Implementasi di Kawasan Industri</h2>

<p>PT Greenfield Environment Solution telah mengimplementasikan sistem IoT monitoring di Kawasan Industri Cikarang dengan hasil:</p>

<ul>
<li>Instalasi 50 sensor untuk monitoring kualitas udara dan air</li>
<li>Pengurangan waktu respon terhadap incident lingkungan dari 4 jam menjadi 15 menit</li>
<li>Peningkatan compliance rate dari 85% menjadi 99%</li>
<li>Penghematan biaya operasional monitoring sebesar 40%</li>
</ul>

<p>Investasi dalam teknologi IoT untuk monitoring lingkungan merupakan langkah strategis yang tidak hanya meningkatkan efisiensi operasional tetapi juga mendukung komitmen perusahaan terhadap sustainability dan environmental stewardship.</p>`,
        excerpt:
          "Bagaimana teknologi Internet of Things (IoT) dapat meningkatkan efektivitas monitoring lingkungan dalam berbagai industri",
        authorId: editorUser.id,
        categoryId: monitoringCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2023-12-10"),
      },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
seedDatabase()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });

export { seedDatabase };
