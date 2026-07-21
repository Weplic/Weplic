import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/Components/SmoothScrollProvider";
import { AppProvider } from "@/Context/AppContext";
import CustomCursor from "@/Components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weplic | High-Velocity Startup Product Studio",
  description: "Weplic is an AI-native digital product studio building production-ready web and mobile apps for ambitious startups.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <AppProvider>
            <CustomCursor />
            {children}
          </AppProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
