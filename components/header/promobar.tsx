// components/PromoBar.tsx
import React from "react";

const PromoBar: React.FC = () => {
  // Data dummy untuk pesan yang berjalan
  const scrollingMessages = [
    "Info baru saja memperpanjang website indo-charcoal.com",
    "Website anggapkembangjaya.co.id",
    "WI**T baru saja memperpanjang website.",
    "Juga website exacoat.com telah diperpanjang!",
  ];

  // Duplikasi teks untuk memastikan panjangnya cukup dan efek berjalan terus menerus
  const scrollingText = scrollingMessages.join(" • ");
  const repeatedText = `${scrollingText} • ${scrollingText} • `;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Container utama bar promo dengan warna orange kecoklatan */}
      <div className="bg-[#EBAD25] text-white shadow-xl py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Bagian Kiri: Promo Code Fixed */}
          <div className="flex-shrink-0 font-bold tracking-wider text-sm md:text-base pr-4">
            <span className="text-yellow-200">PAKAI PROMO CODE:</span>{" "}
            **WEBSITEMURAH**, DISKON **50RB**
          </div>

          {/* Bagian Kanan: Teks Berjalan (Marquee) */}
          <div className="flex-grow min-w-0 overflow-hidden text-sm">
            {/* Menggabungkan kelas Tailwind dengan kelas dari CSS Module */}
            <div className={`whitespace-nowrap marquee`}>
              {repeatedText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;