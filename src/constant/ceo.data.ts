export interface Interview {
  id: number;
  image: string;
  title: string;
  url: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  caption?: string; //  (future use)
  date?: string; //  (future use)
}

export const interviews: Interview[] = [
  {
    id: 1,
    image: "https://img.youtube.com/vi/qAG4O8ZY0Sw/hqdefault.jpg",
    title: "CEO Interview - Episode 50",
    url: "https://www.youtube.com/watch?v=qAG4O8ZY0Sw",
  },
  {
    id: 2,
    image: "https://img.youtube.com/vi/3YGAL58U33U/hqdefault.jpg",
    title: "Business Leader Insight",
    url: "https://www.youtube.com/watch?v=3YGAL58U33U",
  },
  {
    id: 3,
    image: "https://img.youtube.com/vi/mP8FrKddwPM/hqdefault.jpg",
    title: "Vision for Arksh Group",
    url: "https://www.youtube.com/watch?v=mP8FrKddwPM",
  },
  {
    id: 4,
    image: "https://img.youtube.com/vi/0np0T71HsUs/hqdefault.jpg",
    title: "Media Talk - Global Mindset",
    url: "https://www.youtube.com/watch?v=0np0T71HsUs",
  },
];

export const gallery: GalleryItem[] = [
  {
    id: 1,
    image: "https://arkshgroup.com/uploads/gallery/album/1765340819_ncc.png",
    title: "NCC Event",
  },
  {
    id: 2,
    image:
      "https://arkshgroup.com/uploads/gallery/album/1765340819_met%20with%20prime%20minister.png",
    title: "Meeting Prime Minister",
  },
  {
    id: 3,
    image:
      "https://arkshgroup.com/uploads/gallery/album/1765340819_vice%20president%20of%20nepal.png",
    title: "Vice President Meeting",
  },
  {
    id: 4,
    image:
      "https://arkshgroup.com/uploads/gallery/album/1765340818_arksh%20roooftop.png",
    title: "Arksh Rooftop",
  },
  {
    id: 5,
    image:
      "https://arkshgroup.com/uploads/gallery/album/1765340818_at%20madhyapur%20mahotsav.png",
    title: "Madhyapur Mahotsav",
  },
];
