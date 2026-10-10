import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";



export const metadata: Metadata = {
  title: "Url Shortener",
  description: "Generates the shorten version of urls and shows analytics",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
    suppressHydrationWarning
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        
        </body>
    </html>
  );
}
