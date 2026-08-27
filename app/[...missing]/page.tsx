import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested EcoMart page could not be found.",
  robots: { index: false, follow: false },
};

export default function MissingPage(): never {
  notFound();
}
