import type { Metadata } from "next";
import "../globals.css";
import "./login/login.css";

export const metadata: Metadata = {
  title: "Login • MVAPP",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
