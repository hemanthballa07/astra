import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astra | Experience the Infinite",
  description: "The next generation streaming platform for anime, TV series, and movies in stunning 4K.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fontshare: Cabinet Grotesk (headings) + Outfit (body) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600&f[]=outfit@600,500,400&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-cabinet-grotesk: 'Cabinet Grotesk', sans-serif;
                --font-outfit: 'Outfit', sans-serif;
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
