// Root Layout
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
          <AuthProvider>
            <main>{children}</main>
            <Toaster position="bottom-right" richColors theme="dark" />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
