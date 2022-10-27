import { createAction, props } from '@ngrx/store';
import { MessageInterface } from '@utils/interfaces/message.interface';

class MessageActionsClass {
  getMessages = createAction(
    '[Message] Get message',
    props<{ pageSize: number; page: number }>()
  );
  getMessagesSuccess = createAction(
    '[Message] Get message success',
    props<{ messages: MessageInterface[]; count: number }>()
  );
  getMessagesError = createAction(
    '[Message] Get message error',
    props<{ error: string }>()
  );

  addMessage = createAction(
    '[Message] Create message',
    props<{ message: MessageInterface }>()
  );
  addMessageSuccess = createAction(
    '[Message] Create message success',
    props<{ message: MessageInterface }>()
  );
  addMessageError = createAction(
    '[Message] Create message error',
    props<{ error: string }>()
  );
}

export const MessageActions = new MessageActionsClass();
