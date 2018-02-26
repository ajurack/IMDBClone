import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _local: LocalService) { }

  registerForm = {
    email: "",
    name: "",
    password: "",
    passwordConf: ""
  }
  loginForm = {
    email: "",
    password: ""
  }
  displayErr: Boolean;
  regErrors = [];
  logErrors = [];
  userId;
  user;

  ngOnInit() {
    this.registerForm;
  }

  registerNewUser() {
    let registration = this._local.sendNewUser(this.registerForm);
    registration.subscribe(res => {
      if (res["message"] != "success") {
        for (let error in res) {
          this.regErrors.push(res[error].message);
          this.displayErr = true;
        };
      } else {
        this.user = res["user"];
      }
    });
  }

  loginUser() {
    let login = this._local.loginUser(this.loginForm);
    login.subscribe(res => {
      if (res["message"] != "success") {
        for (let error in res) {
          this.logErrors.push(res[error].message);
          this.displayErr = true;
        };
      } else {
        this.user = res["user"];
      }
    });
  }
}
