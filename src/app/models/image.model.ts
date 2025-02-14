import { IAnnonce } from "./annonce.model";
import { ICategory } from "./category.model";
import { IAmenity } from "./amenity.model";

export interface IImage {
  "@context": string | null;
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  annonce: IAnnonce ;
  category: ICategory ;
  amenity: IAmenity ;
}
