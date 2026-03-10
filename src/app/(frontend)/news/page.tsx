import NewsRoom from "@/components/NewsRoom";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsroom | Arksh Group",
  description:
    "Stay updated with the latest announcements, insights, and developments from Arksh Group.",
};

const News = () => {
  return <NewsRoom />;
};

export default News;
