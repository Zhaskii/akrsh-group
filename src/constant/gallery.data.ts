// 1. Define the type for a gallery item
export interface GalleryItem {
  id: number;
  category: string;
  src: string; // external URL
  title: string;
  year: number;
}

// 2. Typed array of gallery items
export const galleryData: GalleryItem[] = [
  {
    id: 1,
    category: "Events",
    src: "https://arkshgroup.com/uploads/gallery/cover/1769672794_1769664831_MAIN%20(2).jpg",
    title: "Dream Skin Opening Event",
    year: 2025,
  },
  {
    id: 2,
    category: "Award Ceremony",
    src: "https://arkshgroup.com/uploads/gallery/cover/1763033643_DSC03153.jpg",
    title: "Arksh Distributor Meet",
    year: 2025,
  },
  {
    id: 3,
    category: "Corporate",
    src: "https://arkshgroup.com/uploads/gallery/cover/202504270620_10118-570x460.jpg",
    title: "Meeting",
    year: 2025,
  },
  {
    id: 4,
    category: "Wellness",
    src: "https://arkshgroup.com/uploads/gallery/cover/202504170713_10048-570x460.jpg",
    title: "Nirvana Wellness",
    year: 2025,
  },
  {
    id: 5,
    category: "Events",
    src: "https://arkshgroup.com/uploads/gallery/cover/1752405367_IMG_1189-min.JPG",
    title: "Awards Ceremony",
    year: 2025,
  },
  {
    id: 6,
    category: "Automobiles",
    src: "https://arkshgroup.com/uploads/gallery/cover/202504170737_IMG-20241025-WA0096-570x460.jpg",
    title: "International Tie-up",
    year: 2025,
  },
];
