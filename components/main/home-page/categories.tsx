import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle, X, Eye, FileText } from "lucide-react"; // Menambah icon baru

// --- DUMMY DATA ---
interface ProjectItem {
  id: number;
  slug: string;
  name: string;
  category: string; // Tambah kategori untuk navigasi dummy
  description: string;
  status: boolean;
  imageUrl: string;
  details: string;
  price: string;
}

const DUMMY_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    slug: "nextjs-ecom",
    name: "E-commerce Modern Next.js",
    category: "Full-Stack",
    description: "Toko online performa tinggi dengan Next.js App Router.",
    status: true,
    imageUrl:
      "https://via.placeholder.com/600x400/2563EB/FFFFFF?text=E-Commerce+Template",
    details:
      "Proyek ini mencakup integrasi Stripe, pengelolaan stok, dan SSR. Sempurna untuk skala UMKM hingga startup.",
    price: "Rp. 5.500.000",
  },
  {
    id: 2,
    slug: "fullstack-blog",
    name: "Blog Full-Stack MERN",
    category: "Full-Stack",
    description: "Platform blog lengkap dengan sistem admin, otentikasi JWT.",
    status: true,
    imageUrl:
      "https://via.placeholder.com/600x400/059669/FFFFFF?text=Blog+Platform+MERN",
    details:
      "Termasuk editor kaya fitur, optimasi SEO dasar, dan sistem komentar. Ideal untuk jurnalis atau komunitas.",
    price: "Rp. 4.200.000",
  },
  {
    id: 3,
    slug: "dashboard-saas",
    name: "Dashboard Admin SaaS UI/UX",
    category: "UI/UX",
    description:
      "Template dashboard profesional dan responsif untuk aplikasi SaaS.",
    status: false,
    imageUrl:
      "https://via.placeholder.com/600x400/6B21A8/FFFFFF?text=SaaS+Dashboard",
    details:
      "Fokus pada pengalaman pengguna dan visualisasi data yang bersih. Belum termasuk integrasi API backend.",
    price: "Rp. 2.800.000",
  },
  {
    id: 4,
    slug: "landing-page-pro",
    name: "Landing Page High Conversion",
    category: "Frontend",
    description:
      "Desain landing page yang berfokus pada konversi, cepat, dan responsif.",
    status: true,
    imageUrl:
      "https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Landing+Page+Pro",
    details:
      "Menggunakan animasi mikro dan A/B testing siap pakai. Cocok untuk kampanye pemasaran produk digital.",
    price: "Rp. 1.800.000",
  },
  {
    id: 5,
    slug: "mobile-app-ui",
    name: "Mobile App UI/UX Mockup",
    category: "Mobile",
    description: "Mockup desain aplikasi mobile dengan tema workspace modern.",
    status: true,
    imageUrl:
      "https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Mobile+App+UI",
    details: "File desain Figma/Sketch siap untuk di-develop oleh tim mobile.",
    price: "Rp. 3.000.000",
  },
];

const DUMMY_CATEGORIES = [
  "Full-Stack",
  "Frontend",
  "UI/UX",
  "Mobile",
  "API/Backend",
];

// --- VARIAN ANIMASI FRAMER MOTION ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- KOMPONEN MODAL DETAIL (Untuk Deskripsi & Harga) ---
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!isOpen || !project) return null;
  const blue = "#2563EB";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full m-4 shadow-2xl overflow-hidden"
      >
        {/* Gambar di dalam Modal (seperti preview) */}
        <div className="bg-gray-100 h-64 w-full flex items-center justify-center overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-[-250px] right-4 p-2 rounded-full bg-white hover:bg-gray-100 transition shadow-lg"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          <h2 className="text-3xl font-bold mb-3" style={{ color: blue }}>
            {project.name}
          </h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-500" /> Deskripsi
              Proyek:
            </h3>
            <p className="text-gray-600">{project.details}</p>
          </div>

          <div className="pt-4 border-t mt-4">
            <p className="text-lg font-bold text-gray-800">Harga Dasar:</p>
            <p className="text-4xl font-extrabold" style={{ color: blue }}>
              {project.price}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const SoloCodingSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Warna biru yang tidak terlalu gelap, sesuai permintaan
  const blue = "#2563EB";
  const transparentBlue = "#2563EB0F"; // Biru sangat transparan/pudar

  const handleOpenDetail = (slug: string) => {
    const project = DUMMY_PROJECTS.find((p) => p.slug === slug);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section
        className="pt-16 pb-20 rounded-t-[40px] md:rounded-t-[80px]" // Rounded top besar
        style={{
          // Gradient Biru sangat pudar (#2563EB dengan opacity rendah) ke Putih
          background: `linear-gradient(to bottom, ${transparentBlue} 5%, #FFFFFF 30%)`,
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header Section dan Navigasi Kategori */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl lg:text-5xl font-extrabold mb-2"
              style={{ color: "#0F172A" }}
            >
              Pilihan Template & Proyek{" "}
              <span style={{ color: blue }}>Siap Pakai</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
              Jelajahi berbagai solusi coding untuk kebutuhan bisnis atau
              personal Anda.
            </p>

            {/* Navigasi Kategori (Meniru tampilan tombol filter) */}
            <div className="flex flex-wrap justify-center gap-3">
              {DUMMY_CATEGORIES.map((cat, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 ${
                    index === 0 // Anggap Full-Stack aktif
                      ? `bg-white border-none shadow-md text-[${blue}]`
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                  style={
                    index === 0
                      ? {
                          color: blue,
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                        }
                      : {}
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid Kartu Proyek */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DUMMY_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                className="group cursor-pointer h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }} // Staggered animation lebih cepat
                // Tidak ada onClick langsung di sini, agar tombol di dalam hover bisa diklik
              >
                <div className="relative h-full overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 transform border border-gray-100">
                  {/* Gambar / Visual */}
                  <div className="h-64 w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                      // Placeholder jika gambar tidak ada
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) =>
                        (e.currentTarget.src = `https://via.placeholder.com/600x400/${project.imageUrl
                          .split("/")[3]
                          .substring(0, 6)}/FFFFFF?text=${project.name.replace(
                          /\s/g,
                          "+"
                        )}`)
                      }
                    />
                  </div>

                  {/* HOVER OVERLAY - Sesuai Permintaan Lampiran */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-200 mb-4">
                        {project.description}
                      </p>

                      {/* Tombol Aksi */}
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleOpenDetail(project.slug)}
                          className="flex items-center text-white bg-transparent border border-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-all text-sm"
                        >
                          <FileText className="w-4 h-4 mr-1" /> Lihat Detail
                        </button>
                        <button
                          // Tindakan dummy untuk Pilih Template (misalnya langsung ke form order)
                          className="flex items-center text-black bg-white px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
                          style={{ color: blue }}
                        >
                          Pilih Template
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer Card (Teks di bawah gambar) */}
                  <div className="p-4 bg-white">
                    <h4 className="text-lg font-bold text-gray-900 leading-snug">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Kategori: {project.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tombol Lihat Lebih Banyak */}
          <div className="text-center mt-12">
            <button
              className="px-6 py-3 font-bold rounded-lg text-white transition duration-300 hover:opacity-90 shadow-md"
              style={{ backgroundColor: blue }}
            >
              Lihat Semua Proyek Siap Pakai
            </button>
          </div>
        </div>
      </section>

      {/* Modal Detail */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
        project={selectedProject}
      />
    </>
  );
};

export default SoloCodingSection;