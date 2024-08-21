import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  allUsers: IUser[] = [];
  currentUser: IUser;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.allUsers = this.userService.getAllUsers();
    this.currentUser = this.userService.getUser();
  }

  deleteUser(user: IUser) {
    localStorage.removeItem('user_' + user.login);
    this.allUsers = this.userService.getAllUsers();
  }
}
