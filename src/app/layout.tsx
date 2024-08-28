import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/text-editor.css";
import { Toaster } from "react-hot-toast";
import { latoFont } from "@/lib/fonts/font-helper";
import { getSeoTag } from "@/lib/seo/seo";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = getSeoTag({
  title: "Slack Clone",
  description: "Slack Clone",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={latoFont.className}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
