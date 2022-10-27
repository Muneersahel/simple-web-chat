import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormComponent } from './resources/user-form/user-form.component';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '@utils/interfaces/app-state.interface';
import {
  combineLatest,
  fromEvent,
  interval,
  map,
  Subject,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import { UserActions } from '@store/user/user.action';
import { MessageActions } from '@store/message/message.action';
import { ChatInputComponent } from '@resources/chat-input/chat-input.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageInterface } from '@utils/interfaces/message.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    ChatInputComponent,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  pageSize = 10;
  page = 0;
  isLoading = false;
  destroy$ = new Subject<void>();
  title = 'Simple Web Chat';
  user$ = this.store.select((state) => state.userState.user);
  count$ = this.store.select((state) => state.messageState.count);
  messages$ = this.store.select((state) => state.messageState.messages);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit() {
    screen.orientation.lock('portrait');
    screen.orientation.addEventListener('change', () => {
      screen.orientation.lock('portrait');
    });

    this.store.dispatch(UserActions.getUser());
    this.isUserPresent
      .pipe(takeUntil(this.destroy$))
      .subscribe((isUserPresent) => {
        if (!isUserPresent) {
          this.openUserNameForm();
        }
      });
    this.store.dispatch(
      MessageActions.getMessages({ pageSize: this.pageSize, page: this.page })
    );
    this.detectStorageChanges();
  }

  onScrollUp() {
    combineLatest([this.count$, this.messages$])
      .pipe(
        take(1),
        map(([count, messages]) => {
          if (count > messages.length) {
            this.isLoading = true;
            setTimeout(() => {
              this.isLoading = false;
            }, 500); // mimic network latency
            this.page += 1;
            this.isLoading = true;
            this.store.dispatch(
              MessageActions.getMessages({
                pageSize: this.pageSize,
                page: this.page,
              })
            );
          }
        })
      )
      .subscribe(() => {});
  }

  detectStorageChanges() {
    fromEvent<StorageEvent>(window, 'storage').subscribe((evt) => {
      if (evt.newValue) {
        const messages = JSON.parse(evt.newValue) as MessageInterface[];
        this.store.dispatch(
          MessageActions.getMessagesSuccess({
            messages,
            count: messages.length,
          })
        );
      }
    });
  }

  get isUserPresent() {
    return this.store.select((state) => state.userState.user !== null);
  }

  openUserNameForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      maxWidth: '95vw',
      disableClose: true,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
