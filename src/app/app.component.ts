import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserNameFormComponent } from './resources/user-name-form/user-name-form.component';

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
    FormsModule,
    MatDialogModule,
  ],
})
export class AppComponent implements OnInit {
  message: string = '';
  messages: { sender: string; text: string; time: Date }[] = [].reverse();
  title = 'simple-web-chat';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    screen.orientation.lock('portrait');
    screen.orientation.addEventListener('change', () => {
      screen.orientation.lock('portrait');
    });

    // todo: check if there is no username saved
    this.openUserNameForm();
  }

  openUserNameForm() {
    const dialogRef = this.dialog.open(UserNameFormComponent, {
      width: '500px',
      maxWidth: '95vw',
      disableClose: true,
    });
  }

  sendMessage() {
    this.messages.unshift({
      sender: 'John Abruzzi',
      text: this.message,
      time: new Date(),
    });

    this.message = '';
    console.log(this.messages);
  }
}
