import type { Metadata } from "next";

import "../globals.css";

import "./home/sidebar.css";

export const metadata: Metadata = {
  title: "MVAPP",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

