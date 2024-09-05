import "@repo/ui/globals.css";
import type { Metadata } from "next";

import SessionProvider from "~/providers/SessionProvider";
// import { Toaster } from "@repo/ui/components/ui/sonner";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Docs",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={"min-h-screen bg-background font-sans antialiased"}>
          <main>{children}</main>
          // <Toaster richColors duration={5000} />
          <Toaster position="bottom-right" />
        </body>
      </SessionProvider>
    </html>
  );
}
