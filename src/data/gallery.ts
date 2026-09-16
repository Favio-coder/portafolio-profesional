export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category?: string;
  year?: string;
}

export const gallery: GalleryItem[] = [
  {
    id: "img-001",
    title: "FAVIO_001",
    image: "/assets/images/gallery/image-01.jpg",
    category: "PORTRAIT",
    year: "2026",
  },
  {
    id: "img-002",
    title: "FAVIO_002",
    image: "/assets/images/gallery/image-02.jpg",
    category: "WORK",
    year: "2026",
  },
  {
    id: "img-003",
    title: "FAVIO_003",
    image: "/assets/images/gallery/image-03.jpg",
    category: "OTHER",
    year: "2026",
  },
];
