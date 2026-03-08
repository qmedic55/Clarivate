"use client";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientProviders({ children }) {
  return (
    <FavoritesProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </FavoritesProvider>
  );
}
