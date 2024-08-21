import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';
import { createPasswordStrengthValidator } from '../../../validators/psw';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
})
export class RegComponent {
  regForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    psw: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      createPasswordStrengthValidator(),
    ]),
    pswRepeat: new FormControl('', [Validators.required]),
  });

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  registration(): void | boolean {
    if (
      this.regForm.getRawValue().psw !== this.regForm.getRawValue().pswRepeat
    ) {
      this.messageService.add({
        severity: 'error',
        summary: `Пароли не совпадают`,
      });
      return false;
    }

    const date = new Date();
    const userObj: IUser = {
      name: this.regForm.getRawValue().name,
      login: this.regForm.getRawValue().login,
      psw: this.regForm.getRawValue().psw,
      regDate: date.toLocaleDateString('ru-RU'),
    };

    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj);
      this.messageService.add({
        severity: 'success',
        summary: `Вы зарегистрированы`,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: `Вы регистрировались ранее`,
      });
    }
  }
}
