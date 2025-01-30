export interface IUser {
    id?: number; // Optionnel car il peut être null
    email: string;
    roles: string[];
    password?: string; // Optionnel, généralement non envoyé côté client
    lastname: string;
    firstname: string;
    birthdate?: string; // Format ISO string pour Date
    phone?: string;
    gender?: string;
    address?: string;
    city?: string;
    country?: string;
    createdAt?: string; // Format ISO string pour Date
    updatedAt?: string; // Format ISO string pour Date
  }