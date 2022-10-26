import { MessageStateInterface } from './message.interface';
import { UserStateInterface } from './user.interface';

export interface AppStateInterface {
  userState: UserStateInterface;
  messageState: MessageStateInterface;
}
