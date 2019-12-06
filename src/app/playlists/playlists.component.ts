import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from "../services/business.service";
import {Observable, Observer, Subscription} from "rxjs";
import {PlaylistModel} from "../models/playlist.model";
import {TrackModel} from "../models/track.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit,OnDestroy {
  isLoading = false;

  constructor(private businessService:BusinessService,private userService:UserService,private router:Router) { }
  playlists:Observable<PlaylistModel[]>;
  subs:Subscription;
  loggedUser:string;

  ngOnInit() {
    this.subs = this.userService.loggedUser.subscribe(user =>{
      this.loggedUser = user.username;
    });

    if(this.loggedUser){
      this.isLoading = true;
     this.businessService.getPlaylists(this.loggedUser).subscribe(response =>{
       this.isLoading = false;
         this.playlists = new Observable<PlaylistModel[]>( (observer:Observer<PlaylistModel[]>) =>{
             return observer.next(response);
           })
     },error => this.isLoading = false);

    }else{
      this.router.navigate(['/login'])
    }

  }

  onEdit(track:TrackModel) {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
