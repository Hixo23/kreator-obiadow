"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { plPL } from "@clerk/localizations";
import { useEffect } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const actualTheme = localStorage.getItem("theme");
    setTheme(actualTheme ?? "system");
  }, [setTheme]);

  console.log(theme);
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      <ClerkProvider
        localization={plPL}
        appearance={{
          baseTheme: theme == "dark" ? dark : undefined,
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
};
