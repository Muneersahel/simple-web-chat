import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  userName: string = '$user-name';
  messageKey: string = '$messages';

  constructor() {}

  setUserName(username: string) {
    sessionStorage.setItem(this.userName, username);
  }

  getUserName() {
    return sessionStorage.getItem(this.userName);
  }

  setObj(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getObj(key: string) {
    const obj = localStorage.getItem(key);
    return obj ? JSON.parse(obj) : null;
  }
}
