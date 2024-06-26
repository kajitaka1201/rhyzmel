import Header from "@/components/ui-elements/header";
import Footer from "@/components/ui-elements/footer";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RhyzMel",
    template: "%s | RhyzMel",
  },
  description: "PC向け音声再生サイトです",
  manifest: "/manifest.json",
  verification: {
    // cspell: disable-next-line
    google: "FhajSGsTRj5nzX9KNqpV8Q0VCWzLMQ1sgjscBh4umlw",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="flex h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
