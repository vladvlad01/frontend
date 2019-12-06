import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  private user = null;
  constructor(private userService:UserService, private router:Router) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("loggedUser"));
    if(this.user){
      this.userService.loggedUser.next(this.user)
    }else{
      this.router.navigate(['/login'])
    }
  }
}
