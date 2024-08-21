import { Component } from '@angular/core';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser: IUser | null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userBehSbject$.subscribe((data) => {
      this.currentUser = data;
    });
  }
}
