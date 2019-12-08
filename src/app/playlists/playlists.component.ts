import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from "../services/business.service";
import {Observable, Observer, Subscription} from "rxjs";
import {PlaylistModel} from "../models/playlist.model";
import {TrackModel} from "../models/track.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit,OnDestroy {
  isLoading = false;
  closeResult: string;
  trackForm: FormGroup;
  playlistForm: FormGroup;


  constructor(private businessService:BusinessService,private userService:UserService,private router:Router, private modalService: NgbModal) { }
  playlists:PlaylistModel[] = [];
  subs:Subscription;
  loggedUser:string;

  ngOnInit() {
    this.playlistForm = new FormGroup({
      playlistName:new FormControl()
    });

    this.trackForm = new FormGroup({
      id: new FormControl(),
      trackID: new FormControl(),
      name: new FormControl(),
      artist: new FormControl(),
      composer: new FormControl(),
      album: new FormControl(),
      genre: new FormControl(),
      kind: new FormControl(),
      sortAlbum: new FormControl(),
    });

    this.subs = this.userService.loggedUser.subscribe(user =>{
      this.loggedUser = user.username;
    });

    if(this.loggedUser){
      this.isLoading = true;
     this.businessService.getPlaylists(this.loggedUser).subscribe(response =>{
       this.isLoading = false;
         this.playlists = response;
     },error => this.isLoading = false);

    }else{
      this.router.navigate(['/login'])
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  open(content,track:TrackModel) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.trackForm.patchValue(track);
  }


  onEditTrack(){
    this.businessService.editTrack(new TrackModel(this.trackForm.value)).subscribe(response=>{
      console.log(response);
    })
  }

  deleteTrack(trackId:number,playlist:PlaylistModel,index:number,playlistIndex){
    this.businessService.deleteTrack(trackId).subscribe(response=>{
      playlist.trackList.splice(index,1);
      console.log(playlist);
      this.playlists[playlistIndex] = playlist;
      console.log(this.playlists[playlistIndex]);
    })
  }

  onAddPlaylist() {
    let userName:string;
    this.userService.loggedUser.subscribe((usr:UserModel) =>{
        userName = usr.username;
    });

    if(userName){
      this.businessService.addPlaylist(userName,this.playlistForm.value).subscribe(user => this.playlists = user.playlist);
    }

  }
}
