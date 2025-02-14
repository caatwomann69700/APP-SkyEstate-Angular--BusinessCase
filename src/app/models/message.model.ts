import { IUser } from './user.model';

export interface IMessage {
  id?: number;
  content: string;
  createdAt?: string;
  sender: IUser | null; 
  receiver: IUser | null; 
  readAt?: string;
  deliveredAt?: string;
  deletedAt?: string;
}
