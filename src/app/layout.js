import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Component/navbar";
import ThemeProvider from "@/Component/ThameProvider";
import { Toaster } from "sonner";
import Footer from "@/Component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: '%s | My Store',
    default: 'My Store', // Used if a page doesn't define its own title
  },
}


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <main>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer/>
          </ThemeProvider>
        </main>
        <Toaster  richColors closeButton position="top-right"  />
      </body>
    </html>
  );
}
