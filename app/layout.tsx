// app/layout.tsx
import "./globals.css"; // Updated path
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="gradient-bg">{children}</body>
    </html>
  );
}
