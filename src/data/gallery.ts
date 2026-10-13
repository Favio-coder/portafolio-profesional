export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  width: number;
  height: number;
  category?: string;
  year?: string;
}

export const gallery: GalleryItem[] = [
  { id: "album-01", title: "Sesión Fotográfica 01", image: "/assets/album/2.jpg", width: 899, height: 1599, category: "PERSONAL", year: "2026" },
  { id: "album-02", title: "Sesión Fotográfica 02", image: "/assets/album/3.jpeg", width: 1600, height: 1204, category: "PERSONAL", year: "2026" },
  { id: "album-03", title: "Sesión Fotográfica 03", image: "/assets/album/1231.jpeg", width: 3000, height: 2250, category: "TRABAJO", year: "2026" },
  { id: "album-04", title: "Sesión Fotográfica 04", image: "/assets/album/1234.jpeg", width: 1204, height: 1600, category: "PERSONAL", year: "2026" },
  { id: "album-05", title: "Sesión Fotográfica 05", image: "/assets/album/21.jpeg", width: 2295, height: 4080, category: "OTRO", year: "2026" },
  { id: "album-06", title: "Sesión Fotográfica 06", image: "/assets/album/231314.jpg", width: 1600, height: 1200, category: "TRABAJO", year: "2026" },
  { id: "album-07", title: "Sesión Fotográfica 07", image: "/assets/album/12121.jpeg", width: 1600, height: 902, category: "PERSONAL", year: "2026" },
  { id: "album-08", title: "Sesión Fotográfica 08", image: "/assets/album/1231415.jpeg", width: 1600, height: 1200, category: "OTRO", year: "2026" },
  { id: "album-09", title: "Sesión Fotográfica 09", image: "/assets/album/1789416065080.jpeg", width: 1280, height: 720, category: "PERSONAL", year: "2026" },
  { id: "album-10", title: "Sesión Fotográfica 10", image: "/assets/album/1789416067112.jpeg", width: 800, height: 600, category: "TRABAJO", year: "2026" },
  { id: "album-11", title: "Sesión Fotográfica 11", image: "/assets/album/Sin título.jpeg", width: 1600, height: 1200, category: "OTRO", year: "2026" },
];
