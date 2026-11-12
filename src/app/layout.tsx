import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navebar from "@/components/nave/Navebar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for hero ar section accents. Body text Geist thake.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ChangeNest — Together We Grow. Together We Change.",
  description:
    "Discover local volunteer events, meet people who care, and turn a few free hours into real change in your community with ChangeNest.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){var d;try{var t=localStorage.getItem("theme");d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);}catch(e){d=window.matchMedia("(prefers-color-scheme: dark)").matches;}document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <Navebar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
