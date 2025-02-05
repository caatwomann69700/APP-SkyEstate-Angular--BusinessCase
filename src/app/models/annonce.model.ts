import { IImage } from "./image.model";
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
  image?: IImage; // ✅ Correction : image est un objet, pas une chaîne de texte
  category?: { id: number; name: string };
  amenities: string[];
  imagesList?: IImageList[];
  imageUrl?: string; // ✅ URL complète de l'image
}
