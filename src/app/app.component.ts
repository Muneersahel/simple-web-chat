import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  ],
})
export class AppComponent implements OnInit {
  message: string = '';
  messages: { sender: string; text: string; time: Date }[] = [].reverse();
  title = 'simple-web-chat';

  ngOnInit() {
    screen.orientation.lock('portrait');
    screen.orientation.addEventListener('change', () => {
      screen.orientation.lock('portrait');
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
