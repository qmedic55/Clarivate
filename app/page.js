import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Ira&apos;s Library</h1>
        <p>Discover books, articles, databases, and more across our collections</p>
        <SearchBar />
        <div className="search-links">
          <Link href="/advanced-search">Advanced Search</Link>
          <a href="#">Browse Databases</a>
          <a href="#">Research Guides</a>
        </div>
      </section>

      <div className="quick-links">
        <Link href="/search?scope=books" className="quick-link-card">
          <div className="quick-link-icon">&#x1F4DA;</div>
          <h3>Books &amp; eBooks</h3>
          <p>Search our physical and electronic book collections</p>
        </Link>
        <Link href="/search?scope=articles" className="quick-link-card">
          <div className="quick-link-icon">&#x1F4C4;</div>
          <h3>Articles &amp; Papers</h3>
          <p>Peer-reviewed journals, conference papers, and more</p>
        </Link>
        <Link href="/search?scope=electronic" className="quick-link-card">
          <div className="quick-link-icon">&#x1F4BB;</div>
          <h3>Online Resources</h3>
          <p>eBooks, databases, and streaming media</p>
        </Link>
        <Link href="/search?scope=course_reserves" className="quick-link-card">
          <div className="quick-link-icon">&#x1F393;</div>
          <h3>Course Reserves</h3>
          <p>Textbooks and materials on reserve for courses</p>
        </Link>
      </div>

      <section className="home-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="number">2.4M+</div>
            <div className="label">Print Volumes</div>
          </div>
          <div className="stat-card">
            <div className="number">850K+</div>
            <div className="label">eBooks</div>
          </div>
          <div className="stat-card">
            <div className="number">120K+</div>
            <div className="label">Journal Titles</div>
          </div>
          <div className="stat-card">
            <div className="number">400+</div>
            <div className="label">Databases</div>
          </div>
        </div>
      </section>
    </>
  );
}
