import { Component, OnInit } from '@angular/core';
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  res;
  registerForm:FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
    });
  }

  register(){
    const user:UserModel = new UserModel(this.registerForm.value);
    this.userService.registerUser(user).subscribe(response =>{
    this.res = response;
    },errorMessage => {
      this.router.navigate(['/login'])
    });

    // this.setActionsToOff();
  }




}
