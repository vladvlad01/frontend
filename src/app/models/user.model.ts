import {PlaylistModel} from "./playlist.model";

export class UserModel {

  id:number;
  username: string;
  password: string;
  playlist: PlaylistModel[];
  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }


  // constructor(username: string, password: string) {
  //   this.username = username;
  //   this.password = password;
  // }
}
