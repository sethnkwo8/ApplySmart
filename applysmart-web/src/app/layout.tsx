import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApplySmart - AI Resume & ATS Optimization Tool",
  description:
  "Optimize your resume for ATS systems and job descriptions using AI-powered keyword analysis and CV scoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
