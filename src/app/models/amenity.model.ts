export interface IAmenity {
  id: number;
  name: string;
  icon: string | { id: number; name: string } | null; 
  annonces: string[];
  image?: { id: number; name: string };
  imageUrl?: string | null;
}
