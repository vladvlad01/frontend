

export class TrackModel {

  id:number
  trackID:number;
  name: String;
  artist: String;
  composer: String;
  album: String;
  genre: String;
  kind: String;
  sortAlbum: String;

  constructor(init?: Partial<TrackModel>) {
    Object.assign(this, init);
  }


  // constructor(username: string, password: string) {
  //   this.username = username;
  //   this.password = password;
  // }
}
