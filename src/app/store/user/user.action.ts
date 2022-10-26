import { createAction, props } from '@ngrx/store';
import { UserInterface } from '@utils/interfaces/user.interface';

class UserActionsClass {
  getUser = createAction('[User] Get user');
  getUserSuccess = createAction(
    '[User] Get user success',
    props<{ user: UserInterface | null }>()
  );
  getUserError = createAction(
    '[User] Get user error',
    props<{ error: string }>()
  );

  createUser = createAction(
    '[User] Create user',
    props<{ user: UserInterface }>()
  );
  createUserSuccess = createAction(
    '[User] Create user success',
    props<{ user: UserInterface }>()
  );
  createUserError = createAction(
    '[User] Create user error',
    props<{ error: string }>()
  );
}

export const UserActions = new UserActionsClass();
