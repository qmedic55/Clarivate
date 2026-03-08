import "./globals.css";
import ClientProviders from "./providers";

export const metadata = {
  title: "Ira's Library — Discovery System",
  description: "A Primo-inspired library discovery interface prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
