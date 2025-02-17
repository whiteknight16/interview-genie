import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";
import Navbar from "@/components/Navbar";
const montserrat = Montserrat({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Interview Genie",
  description: "Get Interview Ready 😉",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: [neobrutalism] }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.className}  antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
