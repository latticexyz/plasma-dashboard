import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Availability Dashboard",
  description:
    "Dashboard to visualize quarry/redstone input commitments and data availability challenge status",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col">
          <div className="bg-blue-500">Header</div>
          <div className="flex-grow bg-green-500">{children}</div>
        </div>
      </body>
    </html>
  );
}
