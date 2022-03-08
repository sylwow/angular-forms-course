import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  // email = new FormControl('', {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: 'blur'
  // });

  // password = new FormControl('', [Validators.required, Validators.minLength(2), createPasswordStrengthValidator()]);

  form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }
    ],
    password: ['',
      [Validators.required, Validators.minLength(2), createPasswordStrengthValidator()]
    ]
  });


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

}