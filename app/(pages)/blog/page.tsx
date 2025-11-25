'use client';

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- DUMMY DATA ---
interface ArticleItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

const DUMMY_ARTICLES: ArticleItem[] = [
  {
    id: 1,
    category: "Full-Stack",
    title: "Jasa Pembuatan Website E-Commerce: Solusi Profesional Next.js",
    excerpt:
      "Panduan lengkap membuat toko online modern dan berkinerja tinggi...",
    date: "25 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/1200x500/2563EB/FFFFFF?text=Fullstack+E-Commerce+Solution",
  },
  {
    id: 2,
    category: "Website",
    title: "Tips Desain Company Profile yang Menjual: Studi Kasus Bisnis B2B",
    excerpt:
      "Pelajari elemen kunci dalam desain web yang meningkatkan kredibilitas bisnis Anda...",
    date: "24 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/1200x500/F59E0B/FFFFFF?text=Company+Profile+Design+B2B",
  },
  {
    id: 3,
    category: "Mobile App",
    title: "Membangun Aplikasi Reservasi Mobile dengan React Native",
    excerpt:
      "Studi kasus implementasi fitur pemesanan lapangan dan manajemen jadwal...",
    date: "23 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/1200x500/10B981/FFFFFF?text=Mobile+App+Reservation",
  },
  {
    id: 4,
    category: "UMKM",
    title: "Strategi Digital UMKM: Mendongkrak Omzet Kuliner dengan Website",
    excerpt:
      "Strategi digital dan website sederhana yang mendongkrak omzet UMKM kuliner...",
    date: "22 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/EF4444/FFFFFF?text=UMKM+Digital+Strategy",
  },
  {
    id: 5,
    category: "Website",
    title: "Website Bengkel Profesional dan Modern: Solusi Otomotif",
    excerpt:
      "Meningkatkan citra bengkel Anda dengan website yang responsif dan fitur lengkap.",
    date: "08 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/9333EA/FFFFFF?text=Automotive+Website",
  },
  {
    id: 6,
    category: "Website Ekspor",
    title:
      "Jasa Website Ekspor Arang Briket Profesional: Menarik Investor Global",
    excerpt:
      "Mendesain web yang fokus pada pasar ekspor dan kebutuhan investor.",
    date: "08 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/D97706/FFFFFF?text=Export+Website+Briket",
  },
  {
    id: 7,
    category: "Website Bisnis",
    title: "Jasa Pembuatan Website Rental Mobil Profesional dan Modern",
    excerpt: "Solusi web untuk manajemen booking dan inventaris mobil rental.",
    date: "08 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/4B5563/FFFFFF?text=Car+Rental+Website",
  },
  {
    id: 8,
    category: "Website Bisnis",
    title: "Jasa Pembuatan Website Travel Profesional untuk Agen Wisata",
    excerpt:
      "Fitur paket wisata, booking online, dan galeri destinasi menarik.",
    date: "08 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/16A34A/FFFFFF?text=Travel+Agency+Web",
  },
  {
    id: 9,
    category: "Website Ekspor",
    title: "Jasa Pembuatan Website Ekspor Terbaik di Indonesia",
    excerpt: "Meningkatkan penjualan global dengan desain web khusus ekspor.",
    date: "30 Oct 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/1D4ED8/FFFFFF?text=Global+Export+Web",
  },
  {
    id: 10,
    category: "Website Ekspor",
    title: "Jasa Pembuatan Website Ekspor Termurah: Solusi Berkualitas Tinggi",
    excerpt:
      "Solusi murah berkualitas untuk perusahaan yang baru memulai ekspor.",
    date: "30 Oct 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/F97316/FFFFFF?text=Affordable+Export+Web",
  },
  {
    id: 11,
    category: "Website Ekspor",
    title: "Jasa Pembuatan Website Ekspor untuk Perusahaan Eksportir",
    excerpt:
      "Meningkatkan citra perusahaan dan menarik klien besar di pasar internasional.",
    date: "30 Oct 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/6D28D9/FFFFFF?text=Corporate+Export+Site",
  },
  {
    id: 12,
    category: "Website Ekspor",
    title: "Jasa Pembuatan Website Ekspor untuk UMKM Ekspor",
    excerpt:
      "Membuka pasar global bagi UMKM dengan website yang mudah dioperasikan.",
    date: "30 Oct 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/BE185D/FFFFFF?text=UMKM+Global+Web",
  },
];

// --- VARIAN ANIMASI FRAMER MOTION ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const BlogSection: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const CAROUSEL_ARTICLES = DUMMY_ARTICLES.slice(0, 3);
  const ARTICLES_PER_PAGE = 6;

  // Logika Pagination untuk Grid Artikel
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  // Memulai grid artikel dari artikel ke-4, setelah carousel
  const paginatedArticles = DUMMY_ARTICLES.slice(3).slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  const totalPages = Math.ceil(
    (DUMMY_ARTICLES.length - CAROUSEL_ARTICLES.length) / ARTICLES_PER_PAGE
  );

  // Auto-slide Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(
        (prevIndex) => (prevIndex + 1) % CAROUSEL_ARTICLES.length
      );
    }, 3000); // Geser setiap 3 detik

    return () => clearInterval(interval);
  }, [CAROUSEL_ARTICLES.length]);

  // Handle Klik Pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Opsional: Gulir ke bagian atas grid setelah ganti halaman
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-4 py-1 rounded-full border border-gray-400 text-gray-600">
            Artikel Solo Coding
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pelajaran dari Pengalaman Nyata
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Temukan solusi praktis yang lahir dari situasi dunia nyata.
          </p>
        </motion.div>

        {/* --- CAROUSEL ARTIKEL UTAMA (Top 3) --- */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl mb-12">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {CAROUSEL_ARTICLES.map((article, index) => (
              <div
                key={article.id}
                className="w-full flex-shrink-0 relative h-96 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.imageUrl})` }}
              >
                {/* Overlay gelap untuk kontras teks */}
                <div className="absolute inset-0 bg-black/50 p-8 flex flex-col justify-end">
                  <span
                    className="text-sm font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block self-start"
                    style={{ backgroundColor: "#EBAD25", color: "#1A376D" }}
                  >
                    {article.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">{article.date}</p>
                  <a
                    href={`/blog/${article.id}`}
                    className="flex items-center text-white font-semibold group w-fit"
                  >
                    Baca Selengkapnya{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {CAROUSEL_ARTICLES.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === carouselIndex
                    ? "bg-white scale-110"
                    : "bg-gray-400 opacity-60"
                }`}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* --- GRID ARTIKEL TERBARU --- */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
          Terbaru
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Gambar Atas */}
              <div className="h-48 overflow-hidden">
                <img
                  src={article.imageUrl.replace("1200x500", "600x400")} // Menggunakan versi placeholder 600x400 untuk kartu
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/600x400/A0A0A0/FFFFFF?text=Solo+Coding+Article")
                  }
                />
              </div>

              {/* Konten Bawah */}
              <div className="p-6">
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block"
                  style={{ backgroundColor: "#2563EB1A", color: "#2563EB" }} // Biru pudar untuk background kategori
                >
                  {article.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>

                <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t mt-4">
                  <span>{article.date}</span>
                  <a
                    href={`/blog/${article.id}`}
                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PAGINATION --- */}
        <div className="flex justify-center mt-12 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                page === currentPage
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;