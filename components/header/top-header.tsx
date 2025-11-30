"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, ShoppingCart, User, Globe, Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/header/id";
import en from "@/translations/header/en";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import PromoBar from "./promobar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, switchLang } = useLanguage();
  const t = useTranslation({ id, en });
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Primary Blue Color
  const primaryBlue = "#2563EB";

  // ===== ambil keranjang langsung dari zustand
  const cartItems = useCart((s) => s.cartItems);
  const cartCount = useMemo(
    () => cartItems.reduce((t, item) => t + item.quantity, 0),
    [cartItems]
  );

  // Mapping warna hover untuk setiap menu (Updated ke Tema Biru SoloCoding)
  const menuItemColors = [
    {
      name: t.website,
      href: "/cari-website",
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
    {
      name: t.custom,
      href: "/custom-website",
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
    {
      name: t.question,
      href: "/pertanyaan",
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
    {
      name: t.timeline,
      href: "/timeline-order",
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  const toggleLanguage = () => {
    const newLang = lang === "id" ? "en" : "id";
    switchLang(newLang);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: newLang })
      );
    }
  };

  const handleCartClick = () => {
    window.location.assign("/cart");
    window.dispatchEvent(new CustomEvent("openCart"));
  };

  const handleUserClick = () => {
    if (status === "loading") return;
    if (session?.user) {
      router.push("/me");
    } else {
      router.push("/login");
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <PromoBar />
      <nav
        className={`fixed top-8 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-blue-100"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items center gap-2">
                <Image
                  src="/logo-text.png"
                  alt="Solo Coding Logo"
                  width={200}
                  height={100}
                  className="rounded-lg object-contain"
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              {menuItemColors.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative font-semibold transition-all duration-300 py-2.5 px-4 group rounded-lg text-sm ${
                      active
                        ? `${item.activeBg} ${item.activeText} shadow-sm`
                        : `${item.textColor} ${item.hoverBg} hover:text-blue-600`
                    }`}
                  >
                    {item.name}
                    {/* Active Indicator Dot */}
                    {active && (
                       <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle - Desktop */}
              <button
                onClick={toggleLanguage}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-300 group border border-blue-200"
                title={t.switchLanguage}
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">
                  {lang.toUpperCase()}
                </span>
              </button>

              {/* User Icon */}
              <button
                onClick={handleUserClick}
                className="p-2.5 rounded-lg hover:bg-gray-100 text-slate-600 hover:text-blue-600 transition-all duration-300"
                aria-label="User"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2.5 cursor-pointer rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all duration-300"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2563EB] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-slate-600 transition-all duration-300"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 z-50 lg:hidden transition-all duration-300 backdrop-blur-sm ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: primaryBlue }}
                >
                  <Code2 className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight text-slate-800">
                    solocoding.id
                  </h2>
                  <p className="text-xs text-slate-500">Jasa Website & Aplikasi</p>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-100"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-4 space-y-2 flex-1 overflow-y-auto bg-slate-50">
            {menuItemColors.map((item, index) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className={`flex items-center gap-4 p-4 rounded-xl font-semibold transition-all duration-300 group border ${
                    active
                      ? "bg-white text-blue-700 border-blue-200 shadow-sm"
                      : "bg-white text-slate-600 border-transparent hover:border-gray-200"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen
                      ? "slideInRight 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      active
                        ? "bg-blue-600"
                        : "bg-gray-300 group-hover:bg-blue-400"
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {active && (
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Language Toggle - Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-4 p-4 w-full rounded-xl text-slate-700 hover:bg-white font-semibold transition-all duration-300 mt-6 border border-gray-200 bg-white shadow-sm"
            >
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="flex-1 text-left">{t.switchLanguage}</span>
              <span className="text-xs font-bold text-white bg-blue-600 px-2 py-1 rounded">
                {lang === "id" ? "EN" : "ID"}
              </span>
            </button>
          </div>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleUserClick}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-slate-600 border border-gray-200 hover:bg-gray-50 transition-all"
              >
                 <User className="w-4 h-4" /> Akun Saya
              </button>
              <button 
                onClick={() => {
                    toggleMobileMenu();
                    router.push("/cari-website");
                }}
                className="w-full text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{ background: primaryBlue }}
              >
                Belanja Sekarang
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-4">
              © 2025 SoloCoding ID. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}