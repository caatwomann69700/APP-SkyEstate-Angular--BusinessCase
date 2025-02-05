import { IImageList } from "./imagelist.model";

export interface IAnnonce {
  id: number;
  title: string;
  description: string;
  price: number;
  surface: string;
  location: string;
  city: string;
  postalCode: string;
  maxOccupants: number;
  createdAt: string;
  updatedAt: string;
  image: string; // ✅ `image` est une chaîne, pas un objet
  category?: { id: number; name: string };
  amenities: string[];
  imagesList?: IImageList[];
  imageUrl?: string; // ✅ URL complète de l'image
}
