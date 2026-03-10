import BlogSection from "@/components/BlogSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Arksh Group",
  description:
    "Read the latest blogs, insights, and updates from Arksh Group covering business, innovation, and industry developments.",
};

export default function Blog() {
  return <BlogSection />;
}
