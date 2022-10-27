import { createReducer, on } from '@ngrx/store';
import { MessageStateInterface } from '@utils/interfaces/message.interface';
import { MessageActions } from './message.action';

const initialState: MessageStateInterface = {
  loading: false,
  messages: [],
  error: null,
  count: 0,
};

export const messageReducer = createReducer(
  initialState,
  on(MessageActions.addMessage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MessageActions.addMessageSuccess, (state, action) => ({
    ...state,
    loading: false,
    messages: [action.message, ...state.messages],
  })),
  on(MessageActions.addMessageError, (state, action) => ({
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
    messages: [...state.messages, ...action.messages],
    count: action.count,
  })),
  on(MessageActions.getMessagesError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
