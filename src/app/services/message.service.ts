import { Injectable } from '@angular/core';
import { MessageInterface } from '@utils/interfaces/message.interface';
import { of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private storageService: StorageService) {}

  addMessage(message: MessageInterface) {
    const messages: MessageInterface[] | null = this.storageService.getObj(
      this.storageService.messageKey
    );
    if (messages !== null) {
      messages.unshift(message);
      this.storageService.setObj(this.storageService.messageKey, messages);
    } else {
      this.storageService.setObj(this.storageService.messageKey, [message]);
    }
    return of(message);
  }

  getMessages(pageSize: number, page: number) {
    const messages = this.storageService.getObj(this.storageService.messageKey);
    if (messages !== null) {
      const count: number = messages.length;
      const start = pageSize * page;
      const end = start + pageSize;

      return of({ messages: messages.slice(start, end), count });
    } else {
      return of({
        messages: [] as MessageInterface[],
        count: 0 as number,
      });
    }
  }
}
