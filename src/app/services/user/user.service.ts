import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: IUser;
  private userLogin: string = '';

  private userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSbject$ = this.userBehSubject.asObservable();

  constructor() {}

  setUser(user: IUser): void {
    this.user = user;
    this.userLogin = user.login;
    this.userBehSubject.next(this.user);
  }

  getUser(): IUser {
    if (this.user) {
      return this.user;
    } else {
      const userFromStore = localStorage.getItem('user_' + this.userLogin);
      const userFromLS = userFromStore ? JSON.parse(userFromStore) : null;
      return userFromLS;
    }
  }

  getAllUsers(): IUser[] {
    const localStorageKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      localStorageKeys.push(localStorage.key(i) as string);
    }
    const allUsersInfo: IUser[] = [];
    localStorageKeys.forEach((el) => {
      const oneUserInfo = JSON.parse(localStorage.getItem(el) as string);
      allUsersInfo.push(oneUserInfo);
    });
    return allUsersInfo;
  }
}
