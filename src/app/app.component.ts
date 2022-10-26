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
import { fromEvent, map, Observable, Subject, takeUntil } from 'rxjs';
import { UserInterface } from '@utils/interfaces/user.interface';
import { UserActions } from '@store/user/user.action';
import { MessageActions } from '@store/message/message.action';
import { ChatInputComponent } from '@resources/chat-input/chat-input.component';

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
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  title = 'Simple Web Chat';
  user$ = this.store.select((state) => state.userState.user);
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
    this.store.dispatch(MessageActions.getMessages());
    this.detectStorageChanges();
  }

  detectStorageChanges() {
    fromEvent<StorageEvent>(window, 'storage').subscribe((evt) => {
      if (evt.newValue) {
        this.store.dispatch(MessageActions.getMessages());
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
