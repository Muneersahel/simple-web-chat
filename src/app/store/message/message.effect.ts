import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from '@services/message.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MessageActions } from './message.action';

@Injectable()
export class MessageEffect {
  constructor(
    private actions: Actions,
    private messageService: MessageService
  ) {}

  createMessage$ = createEffect(() =>
    this.actions.pipe(
      ofType(MessageActions.createMessage),
      mergeMap((action) => {
        return this.messageService.createMessage(action.message).pipe(
          map((res) => {
            return MessageActions.createMessageSuccess({ message: res });
          }),
          catchError((_error) => {
            return of(
              MessageActions.createMessageError({
                error: 'Could not create user, please try again',
              })
            );
          })
        );
      })
    )
  );

  getMessages$ = createEffect(() =>
    this.actions.pipe(
      ofType(MessageActions.getMessages),
      mergeMap(() => {
        return this.messageService.getMessages().pipe(
          map((res) => {
            return MessageActions.getMessagesSuccess({ messages: res });
          }),
          catchError((_error) => {
            return of(
              MessageActions.getMessagesError({
                error: 'Could not get user, please try again',
              })
            );
          })
        );
      })
    )
  );
}
