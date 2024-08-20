import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
})
export class RegComponent {
  regForm: FormGroup;

  payload: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      psw: ['', Validators.required],
      pswRepeat: ['', Validators.required],
      // userInfo: this.fb.array([]),
    });
  }

  // get userInfo(): FormArray {
  //   return this.regForm.get('userInfo') as FormArray;
  // }

  // newUserInfo(): FormGroup {
  //   return this.fb.group({
  //     name: ['', Validators.required],
  //     login: ['', Validators.required],
  //     psw: ['', Validators.required],
  //     pswRepeat: ['', Validators.required],
  //   });
  // }

  // addUserInfo() {
  //   this.userInfo.push(this.newUserInfo());
  // }

  // removeUserInfo(i: number) {
  //   this.userInfo.removeAt(i);
  // }

  showPayload() {
    this.payload = JSON.stringify(this.regForm.getRawValue());
    console.log('PAYLOAD', this.payload);
  }

  registration(): void | boolean {
    console.log('REG psw success');
    if (
      this.regForm.getRawValue().psw !== this.regForm.getRawValue().pswRepeat
    ) {
      console.log('REG MISTAKE');
      this.messageService.add({
        severity: 'error',
        summary: `Пароли не совпадают`,
      });
      return false;
    }

    const userObj: IUser = {
      name: this.regForm.getRawValue().name,
      login: this.regForm.getRawValue().login,
      psw: this.regForm.getRawValue().psw,
      regDate: new Date(),
    };

    // console.log('USER', userObj);

    if (!this.authService.isUserExists(userObj)) {
      console.log('ISUSEREXISTS new User');
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
