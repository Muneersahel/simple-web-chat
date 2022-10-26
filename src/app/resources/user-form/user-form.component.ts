import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '@utils/interfaces/app-state.interface';
import { UserActions } from '@store/user/user.action';
import { combineLatest, mergeMap, Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  destroy$ = new Subject<void>();
  error$ = this.store.select((state) => state.userState.error);
  loading$ = this.store.select((state) => state.userState.loading);

  constructor(
    private store: Store<AppStateInterface>,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const username = this.userForm.value.username;
    if (username) {
      this.store.dispatch(UserActions.createUser({ user: { username } }));
    }

    // combile loading$ and error$ to close dialog when user is created
    combineLatest([this.loading$, this.error$])
      .pipe(
        takeUntil(this.destroy$),
        mergeMap(([loading, error]) => {
          if (!loading && error === null) {
            this.dialogRef.close();
          }
          return [];
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
