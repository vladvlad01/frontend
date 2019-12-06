import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {UserModel} from "../models/user.model";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urls = {
    register: "/Backend/webapi/rest/saveUser",
    login: "/Backend/webapi/rest/login",
  };

  loggedUser:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpClient:HttpClient) { }

  registerUser(user: UserModel): Observable<string> {
    return this.httpClient.post<string>(this.urls.register, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(errorResponse =>{
      let errorMessage = 'An unknown error occurred!'
      if(!errorResponse.error){
        return throwError(errorMessage)
      }
      switch (errorResponse.error) {
        case 'USERNAME_EXIST': errorMessage = 'The username already exist!';
          break;
        case 'EMAIL_EXIST': errorMessage = 'The email already exist!';
          break;
      }
      return throwError(errorMessage);
    }));
  }


  login(user: UserModel): Observable<string> {
    return this.httpClient.post<string>(this.urls.login, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(errorResponse =>{
      let errorMessage = 'An unknown error occurred!'
      if(!errorResponse.error){
        return throwError(errorMessage)
      }
      switch (errorResponse.error) {
        case 'NOT_FOUND': errorMessage = 'User Not Found';
          break;
        case 'INCORECT_PASSWORD': errorMessage = 'The password is incorrect!';
          break;
      }
      return throwError(errorMessage);
    }));
  }
}
