import { UserInterface } from './user.interface';

export interface MessageInterface {
  text: string;
  sender: UserInterface;
  time: Date;
}

export interface MessageStateInterface {
  messages: MessageInterface[];
  loading: boolean;
  error: string | null;
}
