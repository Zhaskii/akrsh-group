export interface VideoCorner {
  id: number;
  youtubeUrl: string;
  thumbnail: string;
}

export interface NewsArticle {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  category?: string;
}

export const chairmanCorner: VideoCorner[] = [
  {
    id: 1,
    youtubeUrl: "https://www.youtube.com/watch?v=SZWKUga2bps",
    thumbnail: "https://img.youtube.com/vi/SZWKUga2bps/hqdefault.jpg",
  },
  {
    id: 2,
    youtubeUrl: "https://www.youtube.com/watch?v=vTXQBzKqQ7I",
    thumbnail: "https://img.youtube.com/vi/vTXQBzKqQ7I/hqdefault.jpg",
  },
  {
    id: 3,
    youtubeUrl: "https://www.youtube.com/watch?v=AenJYhw_Pk4",
    thumbnail: "https://img.youtube.com/vi/AenJYhw_Pk4/hqdefault.jpg",
  },
];

export const ceoCorner: VideoCorner[] = [
  {
    id: 1,
    youtubeUrl: "https://www.youtube.com/watch?v=qAG4O8ZY0Sw&t=3s",
    thumbnail: "https://img.youtube.com/vi/qAG4O8ZY0Sw/hqdefault.jpg",
  },
  {
    id: 2,
    youtubeUrl: "https://www.youtube.com/watch?v=0np0T71HsUs&t=1s",
    thumbnail: "https://img.youtube.com/vi/0np0T71HsUs/hqdefault.jpg",
  },
  {
    id: 3,
    youtubeUrl: "https://www.youtube.com/watch?v=mP8FrKddwPM",
    thumbnail: "https://img.youtube.com/vi/mP8FrKddwPM/hqdefault.jpg",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    date: "Feb 07, 2026",
    title:
      "कोदोको ब्राण्डिङमा आर्क्स ग्रुप, निर्यात गरेर विश्वव्यापी बनाउने रणनीति",
    excerpt:
      "काठमाडौं । आर्क्स ग्रुपले नेपालको ग्रामीण भेगमा फल्ने कोदोलाई अन्तर्राष्ट्रियकरण गर्ने योजनाअनुरुप कोदोको विभिन्न उत्पादनहरु बजारमा ल्याएको छ । होटल, मोटर्स, हेल्थकेयरलगायत क्षेत्रमा लगानी गरिरहेको यस...",
    image: "https://arkshgroup.com/uploads/blog/Rajesh-Kaji-Shrestha%20(1).jpg",
    category: "Corporate",
  },
  {
    id: 2,
    date: "Dec 20, 2025",
    title: "चेम्बरको प्रदेशमा हरिवनका लुईंटेल र पोते पनि",
    excerpt:
      "काठमाडौं । आर्क्स ग्रुपले नेपालको ग्रामीण भेगमा फल्ने कोदोलाई अन्तर्राष्ट्रियकरण गर्ने योजनाअनुरुप कोदोको विभिन्न उत्पादनहरु बजारमा ल्याएको छ । होटल, मोटर्स, हेल्थकेयरलगायत क्षेत्रमा लगानी गरिरहेको यस...",
    image: "https://arkshgroup.com/uploads/blog/chamber.webp",
    category: "Event",
  },
  {
    id: 3,
    date: "Nov 15, 2025",
    title:
      "पर्यटन प्रवद्र्धनका लागि बैंकक–लुम्बिनी सीधा हवाइ सम्पर्कमा चेम्बरको जोड",
    excerpt:
      "काठमाडौं । आर्क्स ग्रुपले नेपालको ग्रामीण भेगमा फल्ने कोदोलाई अन्तर्राष्ट्रियकरण गर्ने योजनाअनुरुप कोदोको विभिन्न उत्पादनहरु बजारमा ल्याएको छ । होटल, मोटर्स, हेल्थकेयरलगायत क्षेत्रमा लगानी गरिरहेको यस...",
    image: "https://arkshgroup.com/uploads/blog/Screenshot_4-11.jpg",
    category: "Milestone",
  },
  {
    id: 4,
    date: "Feb 07, 2026",
    title:
      "कोदोको ब्राण्डिङमा आर्क्स ग्रुप, निर्यात गरेर विश्वव्यापी बनाउने रणनीति",
    excerpt:
      "काठमाडौं । आर्क्स ग्रुपले नेपालको ग्रामीण भेगमा फल्ने कोदोलाई अन्तर्राष्ट्रियकरण गर्ने योजनाअनुरुप कोदोको विभिन्न उत्पादनहरु बजारमा ल्याएको छ । होटल, मोटर्स, हेल्थकेयरलगायत क्षेत्रमा लगानी गरिरहेको यस...",
    image:
      "https://arkshgroup.com/uploads/blog/496623646_1885317182264979_2923009382636014238_n-1747122362.jpg",
  },
  {
    id: 5,
    date: "Feb 07, 2026",
    title:
      "कोदोको ब्राण्डिङमा आर्क्स ग्रुप, निर्यात गरेर विश्वव्यापी बनाउने रणनीति",
    excerpt:
      "काठमाडौं । आर्क्स ग्रुपले नेपालको ग्रामीण भेगमा फल्ने कोदोलाई अन्तर्राष्ट्रियकरण गर्ने योजनाअनुरुप कोदोको विभिन्न उत्पादनहरु बजारमा ल्याएको छ । होटल, मोटर्स, हेल्थकेयरलगायत क्षेत्रमा लगानी गरिरहेको यस...",
    image: "https://arkshgroup.com/uploads/blog/Nirvana-.jpg",
  },
  {
    id: 6,
    date: "Feb 07, 2026",
    title:
      "कोदोको ब्राण्डिङमा आर्क्स ग्रुप, निर्यात गरेर विश्वव्यापी बनाउने रणनीति",
    excerpt:
      "काठमाडौं । आर्क्स ग्रुपले नेपालको ग्रामीण भेगमा फल्ने कोदोलाई अन्तर्राष्ट्रियकरण गर्ने योजनाअनुरुप कोदोको विभिन्न उत्पादनहरु बजारमा ल्याएको छ । होटल, मोटर्स, हेल्थकेयरलगायत क्षेत्रमा लगानी गरिरहेको यस...",
    image: "https://arkshgroup.com/uploads/blog/Ranjit-Raya-150x150.jpg",
  },
];
