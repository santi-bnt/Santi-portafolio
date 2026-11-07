import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { MotionController } from "@/components/motion-controller";
import { StartupIntro } from "@/components/startup-intro";
import { Footer } from "@/components/profile-sections";
import "./globals.css";

const title = "Santiago Benavent Valenzuela | Robotics & Software Portfolio";
const description = "Robotics and Digital Systems Engineering student at Tecnológico de Monterrey. Projects in software engineering, embedded systems, robotics, AI, and hardware integration.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Santiago Benavent" },
  description,
  authors: [{ name: "Santiago Benavent Valenzuela" }],
  openGraph: { title, description, type: "website", locale: "en_US", siteName: "Santiago Benavent · Portfolio" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=['light','dark'].includes(t)?t:'system'}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head><body id="top"><a href="#main-content" className="skip-link">Skip to content</a><MotionController/><StartupIntro/><Navbar/>{children}<Footer/></body></html>;
}
