"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Header() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          <div className="header-logo-icon">IL</div>
          Ira&apos;s Library
        </Link>
        <nav className="header-nav">
          <Link
            href="/"
            className={`header-nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Search
          </Link>
          <Link
            href="/advanced-search"
            className={`header-nav-link ${pathname === "/advanced-search" ? "active" : ""}`}
          >
            Advanced Search
          </Link>
          <Link
            href="/favorites"
            className={`header-nav-link ${pathname === "/favorites" ? "active" : ""}`}
          >
            My Favorites{favorites.length > 0 ? ` (${favorites.length})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
