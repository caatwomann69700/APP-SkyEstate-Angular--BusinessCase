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
    image?: { name: string };
    category?: { name: string };
  }
  