"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export const providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
