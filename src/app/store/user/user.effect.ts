import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@services/user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserActions } from './user.action';

@Injectable()
export class UserEffect {
  constructor(private actions: Actions, private userService: UserService) {}

  createUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.createUser),
      mergeMap((action) => {
        return this.userService.createUser(action.user.username).pipe(
          map((res) => {
            return UserActions.createUserSuccess({ user: res });
          }),
          catchError((_error) => {
            return of(
              UserActions.createUserError({
                error: 'Could not create user, please try again',
              })
            );
          })
        );
      })
    )
  );

  getUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.getUser),
      mergeMap(() => {
        return this.userService.getUser().pipe(
          map((res) => {
            return UserActions.getUserSuccess({ user: res });
          }),
          catchError((_error) => {
            return of(
              UserActions.getUserError({
                error: 'Could not get user, please try again',
              })
            );
          })
        );
      })
    )
  );
}
