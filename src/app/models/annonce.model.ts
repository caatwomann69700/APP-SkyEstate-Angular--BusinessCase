import { IImage } from "./image.model";
import { IImageList } from "./imagelist.model";
import { IUser } from "./user.model";

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
  image?: IImage; 
  category?: { id: number; name: string };
  amenities: string[];
  imagesList?: IImageList[];
  imageUrl?: string; 
  user: IUser;
}

