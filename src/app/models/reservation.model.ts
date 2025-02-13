export interface IReservation {
    id: number;
    startDate: string; // Date au format ISO, ex: "2025-02-07T00:00:00+00:00"
    endDate: string;   // Date au format ISO
    status: 'pending' | 'confirmed' | 'canceled';
    taxes: number;
    serviceFees: number;
    totalAmount: number;
    createdAt: string; // Date au format ISO
    updatedAt: string; // Date au format ISO
    annonce: string;   // URL de l'annonce associée, ex: "/api/annonces/1"
    
}