import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageInterface } from '@utils/interfaces/message.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '@utils/interfaces/app-state.interface';
import { MessageActions } from '@store/message/message.action';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements OnInit {
  @Input() username: string = '';
  message: string = '';
  messages: MessageInterface[] = [];

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {}

  sendMessage() {
    if (this.message) {
      const messageItem: MessageInterface = {
        text: this.message,
        time: new Date(),
        sender: {
          username: this.username,
        },
      };
      this.store.dispatch(
        MessageActions.addMessage({
          message: messageItem,
        })
      );
      this.message = '';
      const container = document.querySelector('.chat-messages');
      container!.scrollTop = container!.scrollHeight;
    }
    this.messages.unshift({
      sender: { username: 'John Abruzzi' },
      text: this.message,
      time: new Date(),
    });

    this.message = '';
  }
}
