import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userStorage: IUser[] = [];

  constructor() { }

  setUser(user: IUser): void {
    // console.log('USER', user);
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.userStorage.push(user);
      const userJsonStr = JSON.stringify(user)
      localStorage.setItem('user_'+user.login, userJsonStr)
    }
  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    const userFromLS = localStorage.getItem('user_' + user.login);
    if (!isUserExists && !userFromLS) {
      return false
    }
    return true;
  }

  checkUser(user: IUser): boolean {
    let userInStore: IUser = <IUser>{};
    
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    const userFromLS = localStorage.getItem('user_' + user.login);

    if (userFromLS) {
      const parseUser = JSON.parse(userFromLS);
      userInStore = parseUser?.login === user.login ? parseUser : null;
    } else if (isUserExists) {
      userInStore = isUserExists;
    }

    return userInStore?.psw === user.psw
  }
}
