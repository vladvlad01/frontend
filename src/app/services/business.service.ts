import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {UserModel} from "../models/user.model";
import {catchError, map, tap} from "rxjs/operators";
import {PlaylistModel} from "../models/playlist.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {TrackModel} from "../models/track.model";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private readonly urls = {
    viewPlaylist: "/Backend/webapi/rest/viewPlaylist",
    updateTrack: "/Backend/webapi/rest/updateTrack",
    deleteTrack: "/Backend/webapi/rest/deleteTrack",
    addPlaylist: "/Backend/webapi/rest/addPlaylist",
  };

  constructor(private httpClient:HttpClient,private userService:UserService,private router:Router) { }

  getPlaylists(username:string): Observable<PlaylistModel[]> {
    return this.httpClient.get<PlaylistModel[]>(this.urls.viewPlaylist,{params:{username}}).pipe(catchError(this.handleError),tap(resData => {}));
  }

  editTrack(track: TrackModel): Observable<TrackModel> {
    return this.httpClient.post<TrackModel>(this.urls.updateTrack, track, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(this.handleError));
  }

  deleteTrack(trackId:number):Observable<string>{
    const url = `${this.urls.deleteTrack}/${trackId}`;
    return this.httpClient.delete<string>(url);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
      case 'USERNAME_EXIST': errorMessage = 'The username already exist!';
        break;
      case 'EMAIL_EXIST': errorMessage = 'The email already exist!';
        break;
      case 'USER_NOT_FOUND':
        errorMessage = 'This user does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }


  addPlaylist(username:string,playlistName:string):Observable<UserModel>{
    let params = new HttpParams();
    // Begin assigning parameters
    params = params.append('username', username);
    params = params.append('playlistName', playlistName);

    return this.httpClient.get<UserModel>(this.urls.viewPlaylist,{params: params}).pipe(catchError(this.handleError),tap(resData => {}));
  }
}
