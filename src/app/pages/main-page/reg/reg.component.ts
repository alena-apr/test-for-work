import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss'
})
export class RegComponent {

  regForm: FormGroup;

  payload: any;

  constructor(private fb: FormBuilder) {
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      psw: ['', Validators.required],
      userInfo: this.fb.array([])
    })
  }

  get userInfo(): FormArray {
    return this.regForm.get('userInfo') as FormArray;
  }

  newUserInfo(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      psw: ['', Validators.required],
    })
  }

  addUserInfo() {
    this.userInfo.push(this.newUserInfo())
  }

  removeUserInfo(i: number) {
    this.userInfo.removeAt(i);
  }

  showPayload() {
    this.payload = JSON.stringify(this.regForm.getRawValue())
    console.log("PAYLOAD", this.payload)
  }

}
