// Interface for video data
export interface Video {
  id: number;
  thumbnail: string;
  youtubeUrl: string;
}

// Interface for positions
export interface Position {
  title: string;
  organization: string;
}

// Interface for awards
export interface Award {
  year: string;
  title: string;
  desc: string;
}

// Gallery images are just strings, so no interface needed
export type GalleryImage = string;

// Now type the arrays
export const videoData: Video[] = [
  {
    id: 1,
    thumbnail: "https://img.youtube.com/vi/97qGGH2fVDk/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=97qGGH2fVDk",
  },
  {
    id: 2,
    thumbnail: "https://img.youtube.com/vi/-aYsOyMspVY/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=-aYsOyMspVY",
  },
  {
    id: 3,
    thumbnail: "https://img.youtube.com/vi/_dr10viBmUs/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=_dr10viBmUs",
  },
  {
    id: 4,
    thumbnail: "https://img.youtube.com/vi/rMMA6Th7jGg/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=rMMA6Th7jGg",
  },
  {
    id: 5,
    thumbnail: "https://img.youtube.com/vi/P8IvLSShPHc/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=P8IvLSShPHc",
  },
  {
    id: 6,
    thumbnail: "https://img.youtube.com/vi/cdylmPeP4Zk/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=cdylmPeP4Zk",
  },
];

export const positions: Position[] = [
  {
    title: "Honorary Consul",
    organization: "Socialist Republic of Vietnam to Nepal",
  },
  {
    title: "Chairman",
    organization: "International Chamber of Commerce, Nepal",
  },
  {
    title: "Chairman Advisory Council & Past President",
    organization: "Nepal Chamber of Commerce",
  },
  {
    title: "Honorary President",
    organization: "Nepal China Chamber of Commerce & Industry",
  },
  {
    title: "Patron",
    organization: "Nepal Vietnam Chamber of Commerce & Industry",
  },
  {
    title: "Patron",
    organization: "Nepal Italy Chamber of Commerce & Industry",
  },
  {
    title: "Former Vice President",
    organization:
      "World Association for Small & Medium Enterprises (WASME), India",
  },
  {
    title: "Chairman",
    organization: "Bhanubhakta Memorial Purba Bidhyarthi Samaj (Alumni)",
  },
  {
    title: "Executive Member",
    organization: "Honorary Consular Corps-Nepal (HCC-N)",
  },
  { title: "Former Senator", organization: "Tribhuvan University" },
];

export const allAwards: Award[] = [
  {
    year: "2025",
    title: "Outstanding Contribution in Business Award",
    desc: "Honored as Outstanding Contribution in Business Award by Rt. Honorable Prime Minister KP Sharma Oli on behalf of the Phoenix Inspiration, 2025",
  },
  {
    year: "2022",
    title: "Letter of Honor by Nepal Tayari Poshak Udhyog Sang",
    desc: "Honored with Letter of honor by Nepal Tayari Poshak Udhyog Sang - 2022 for his work towards development of Nepali garment.",
  },
  {
    year: "2022",
    title: "Corporate Dynamic Business Leader Award",
    desc: "Corporate Dynamic Business leader Award- 2022 by Corporate khabar for his Excellent Contribution in Nepalese Industry.",
  },
  {
    year: "2021",
    title: "Sukritimaya Rastra Deep Third",
    desc: "Decorated with Sukritimaya Rastra Deep Third by Rt. Honorable President of Nepal Bidhya Devi Bhandari, 2021.",
  },
  {
    year: "2021",
    title: "Honored with Excellence Award",
    desc: "Honored with Excellence Award - 2021 in reorganization of the Indo-Nepal Friendship Award by the Confederation of West Bengal Trade Association.",
  },
  {
    year: "2019",
    title: "Honored as a commercially important person (CIP)",
    desc: "Honored as a commercially important person (CIP) by Rt. Honorable Prime Minister K.P. Sharma Oli-2019.",
  },
  {
    year: "2017",
    title: "Decorated with Suprabal Jansewa Shri",
    desc: "Decorated with Suprabal Jansewa Shri by Rt. Honorable President of Nepal Bidhya Devi Bhandari, 2017.",
  },
  {
    year: "2005",
    title: "Decorated with the Bikhyat Trishakti Patta Third",
    desc: "Decorated with the Bikhyat Trishakti Patta Third-2005 by His Majesty King Gyanendra Bir Bikram Shah Dev on the occasion of His Majesty's 59th Birth Anniversary.",
  },
  {
    year: "1999",
    title: "Decorated with Prakhyat Trishakti Patta",
    desc: "Decorated with Prakhyat Trishakti Patta-1999 by His Majesty King Birendra Bir Bikram Shah Dev on the auspicious occasion of His Majesty's 55th Birth Anniversary.",
  },
];

export const galleryImages: GalleryImage[] = [
  "https://arkshgroup.com/uploads/gallery/album/1750838552_Decorated-with-Prakhyat-Trishakti-Patta-by-His-Majesty-Late-King-Birendra-Bir-Bikram-Shah-Dev.jpg",

  "https://arkshgroup.com/uploads/gallery/album/1750838541_Decorated-with-Prabal-Gorkha-Dakshin-Bahu-by-His-Majesty-Late-King-Birendra-Bir-Bikram-Shah-Dev.jpg",

  "https://arkshgroup.com/uploads/gallery/album/1750838578_0816e087-43b8-439a-8884-b0314765a9fb.jpg",

  "https://arkshgroup.com/uploads/gallery/album/1750838586_9fc40ef4-46b4-47bb-a45c-bf167085e44c.jpg",
];
