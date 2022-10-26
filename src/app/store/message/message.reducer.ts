import { createReducer, on } from '@ngrx/store';
import { MessageStateInterface } from '@utils/interfaces/message.interface';
import { MessageActions } from './message.action';

const initialState: MessageStateInterface = {
  loading: false,
  messages: [],
  error: null,
};

export const messageReducer = createReducer(
  initialState,
  on(MessageActions.createMessage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MessageActions.createMessageSuccess, (state, action) => ({
    ...state,
    loading: false,
    messages: [action.message, ...state.messages],
  })),
  on(MessageActions.createMessageError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(MessageActions.getMessages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MessageActions.getMessagesSuccess, (state, action) => ({
    ...state,
    loading: false,
    messages: action.messages,
  })),
  on(MessageActions.getMessagesError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
