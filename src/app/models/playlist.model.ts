import {TrackModel} from "./track.model";


export class PlaylistModel {

  id:number;
  name: String;
  trackList: TrackModel[];

  constructor(init?: Partial<PlaylistModel>) {
    Object.assign(this, init);
  }


  // constructor(username: string, password: string) {
  //   this.username = username;
  //   this.password = password;
  // }
}
