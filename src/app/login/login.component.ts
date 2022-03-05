import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  val = {
    email: 'ex@ex.com',
    password: '12345678'
  }

  constructor() {


  }

  ngOnInit() {

  }

  login(loginForm, ev) {
    console.log(loginForm)
    console.log(this.val)
  }

}
