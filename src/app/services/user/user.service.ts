import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string;
  
  private userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSbject$ = this.userBehSubject.asObservable();
  
  constructor() { }

  setUser(user: IUser): void {
    this.user = user;
    this.userBehSubject.next(this.user);
  }

  setToken(token: string): void {
    this.token = token;
  }
}
