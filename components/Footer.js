import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>Ira&apos;s Library</h4>
          <ul>
            <li><Link href="/about">About the Library</Link></li>
            <li><Link href="/hours">Hours &amp; Locations</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/staff">Staff Directory</Link></li>
          </ul>
        </div>
        <div>
          <h4>Research Help</h4>
          <ul>
            <li><Link href="/guides">Research Guides</Link></li>
            <li><Link href="/ill">Interlibrary Loan</Link></li>
            <li><Link href="/citations">Citation Tools</Link></li>
            <li><Link href="/ask">Ask a Librarian</Link></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><Link href="/reserves">Course Reserves</Link></li>
            <li><Link href="/special">Special Collections</Link></li>
            <li><Link href="/digital">Digital Scholarship</Link></li>
            <li><Link href="/workshops">Workshops &amp; Events</Link></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><Link href="/news">Library News</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/feedback">Feedback</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        Ira&apos;s Library Discovery System &mdash; A Primo-inspired prototype &mdash; Built with Next.js
      </div>
    </footer>
  );
}
