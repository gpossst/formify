import type { Metadata } from "next";
import { Fredoka, Merriweather_Sans } from "next/font/google";
import "@/app/globals.css";
import Logo from "../components/Logo";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-merriweather-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Formify",
  description: "The form creation and monitoring tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${merriweatherSans.variable} antialiased h-full`}
      >
        <div className="h-full flex flex-col items-center">
          <div className="absolute top-10">
            <Logo size={100} />
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
