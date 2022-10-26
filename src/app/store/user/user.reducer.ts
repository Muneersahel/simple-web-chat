import { createReducer, on } from '@ngrx/store';
import { UserStateInterface } from '@utils/interfaces/user.interface';
import { UserActions } from './user.action';

const initialState: UserStateInterface = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.createUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(UserActions.createUserError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(UserActions.getUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.getUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(UserActions.getUserError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
