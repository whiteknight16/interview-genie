import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";
import Navbar from "@/components/Navbar";
const montserrat = Montserrat({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { checkUser } from "../lib/checkUser";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Interview Genie",
  description: "Get Interview Ready 😉",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkUser();
  return (
    <ClerkProvider appearance={{ baseTheme: [neobrutalism] }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.className}  antialiased`}>
          <Toaster />
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
