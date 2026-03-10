import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Arksh Group",
  description:
    "Get in touch with Arksh Group for inquiries, partnerships, and business opportunities.",
};

export default function Contact() {
  return <ContactSection />;
}
