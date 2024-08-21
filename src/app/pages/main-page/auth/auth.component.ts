import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  authForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    psw: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onAuth(): void {
    const authUserObj: IUser = {
      login: this.authForm.getRawValue().login,
      psw: this.authForm.getRawValue().psw,
    };

    if (this.authService.checkUser(authUserObj)) {
      this.userService.setUser(authUserObj);
      // this.userService.setToken('user-private-token');
      this.router.navigate(['home']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: `Неверный логин или пароль`,
      });
    }
  }
}
