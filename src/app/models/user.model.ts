import { IImage } from "./image.model";

export interface IUser {
    id?: number; 
    email: string;
    roles: string[];
    password?: string; 
    lastname: string;
    firstname: string;
    birthdate?: string; 
    phone?: string;
    gender?: string;
    address?: string;
    city?: string;
    country?: string;
    createdAt?: string; 
    updatedAt?: string; 
    image?: IImage | null;
  }