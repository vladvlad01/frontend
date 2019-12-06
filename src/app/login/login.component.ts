import { Component, OnInit } from '@angular/core';
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error;
  loginForm:FormGroup;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
    });
  }

  login(){
    const user:UserModel = new UserModel(this.loginForm.value);
    this.userService.login(user).subscribe(response =>{
      localStorage.setItem("loggedUser",JSON.stringify(response));
      this.userService.loggedUser.next(user);
      this.router.navigate(['/home']);
    },errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
    });

    // this.setActionsToOff();
  }
}
