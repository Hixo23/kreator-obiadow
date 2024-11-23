import "@/shared/styles/globals.css";
import { Poppins } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  variable: "--poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kreator obiadów",
  description: "Kreator obiadów to aplikacja do planowania posiłków.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          <ClerkProvider appearance={{
            baseTheme: dark
          }}>
            <TRPCReactProvider>
              {children}
            </TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
