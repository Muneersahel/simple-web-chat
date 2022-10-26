import { createAction, props } from '@ngrx/store';
import { MessageInterface } from '@utils/interfaces/message.interface';

class MessageActionsClass {
  getMessages = createAction('[Message] Get message');
  getMessagesSuccess = createAction(
    '[Message] Get message success',
    props<{ messages: MessageInterface[] }>()
  );
  getMessagesError = createAction(
    '[Message] Get message error',
    props<{ error: string }>()
  );

  createMessage = createAction(
    '[Message] Create message',
    props<{ message: MessageInterface }>()
  );
  createMessageSuccess = createAction(
    '[Message] Create message success',
    props<{ message: MessageInterface }>()
  );
  createMessageError = createAction(
    '[Message] Create message error',
    props<{ error: string }>()
  );
}

export const MessageActions = new MessageActionsClass();
