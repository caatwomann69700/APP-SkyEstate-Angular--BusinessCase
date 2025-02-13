import { IImage } from "./image.model";

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  image?: IImage; 
}
