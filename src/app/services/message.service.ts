import { Injectable } from '@angular/core';
import { MessageInterface } from '@utils/interfaces/message.interface';
import { of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private storageService: StorageService) {}

  createMessage(message: MessageInterface) {
    const messages = this.storageService.getObj(this.storageService.messageKey);
    if (messages) {
      messages.push(message);
      this.storageService.setObj(this.storageService.messageKey, messages);
    } else {
      this.storageService.setObj(this.storageService.messageKey, [message]);
    }
    return of(message);
  }

  getMessages() {
    const messages = this.storageService.getObj(this.storageService.messageKey);
    if (messages === null) {
      return of([]);
    }
    return of(messages.reverse());
  }
}
