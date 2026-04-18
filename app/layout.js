import { Manrope, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/scroll-progress";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Probox",
  description: "Probox landing page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} min-h-screen bg-slate-50 font-sans text-slate-900 antialiased`}
      >
        <SmoothScroll>
          <div className="relative isolate min-h-screen">
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
