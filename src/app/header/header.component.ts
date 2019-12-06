import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    user:any = '';
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.userService.loggedUser.subscribe(usr =>{
      this.user = usr;
    })
  }

  logout() {
    localStorage.removeItem("loggedUser");
    this.userService.loggedUser.next(null);
    this.router.navigate(['/login'])
  }

}
