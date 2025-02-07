export interface IReservationWrite {
    startDate: string;
    endDate: string;
    status: 'pending' | 'confirmed' | 'canceled';
    taxes: number;
    serviceFees: number;
    annonce: string;
  }
  