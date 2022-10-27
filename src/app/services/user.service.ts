import { Injectable } from '@angular/core';
import { UserInterface } from '@utils/interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageService) {}

  createUser(username: string): Observable<UserInterface> {
    this.storageService.setUserName(username);
    return of({ username });
  }

  getUser(): Observable<UserInterface | null> {
    const username = this.storageService.getUserName();
    if (username !== null) {
      return of({ username: username });
    }
    return of(null);
  }
}
