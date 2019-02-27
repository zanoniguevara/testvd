import { Component } from '@angular/core'; 
import { Events } from '@ionic/angular';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  jsonvideo;
  players = [];
  videocontenedor: any;
  player: any;
  opciones: any;
  onPlay: string;
  // vppalP: string; 

  arrVgApi:VgAPI[] = [];
  api: VgAPI;
  auxapi: VgAPI;
  apiext: VgAPI;
  vgctrl: boolean;


  constructor(public events: Events) {
    this.vgctrl = false;
    this.onPlay = "";
    this.jsonvideo =
      {
        'name': 'Persona',
        'url': 'https://vjs.zencdn.net/v/oceans.mp4',
        'type': 'video/mp4',
        'videos': [
          { 'id': 'vd01', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd02', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd03', 'url': 'http://static.videogular.com/assets/videos/videogular.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd04', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd05', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd06', 'url': 'http://static.videogular.com/assets/videos/videogular.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd07', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd08', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' }
        ]
      }
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.auxapi = api;
    this.apiext = api;
    this.arrVgApi.push(api);

    this.api.getDefaultMedia().subscriptions.play.subscribe(() => {
      this.api = api;
      if (this.api != this.auxapi) {
        this.auxapi.pause();
      }
      this.auxapi = api;
    });  
    this.api.fsAPI.onChangeFullscreen.subscribe((event) => {
      this.toggleFullscreen(event);
    });
  }

  pip(idvideo: string, idsrc:string) {
    this.apiext = this.arrVgApi.find(item => item.getDefaultMedia().id.toString()===idvideo);
    this.events.publish('sp_pipmode-up', this.apiext, document.getElementById(idsrc).getAttribute("src"));
    this.apiext.pause();
  }

  ppl(idvideo: string, idsrc:string) {
    console.log("aqui");
    this.apiext = this.arrVgApi.find(item => item.getDefaultMedia().id.toString()===idvideo);
    this.events.publish('sp_pplmode-up', this.apiext, document.getElementById(idsrc).getAttribute("src"));
    this.apiext.pause();
  }
  
  masvideos(){
          
          this.jsonvideo.videos.push({ 'id': 'vd09', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4', 'poster': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' });
          console.log(this.jsonvideo);
  }

  toggleFullscreen($event){
    this.vgctrl = $event;
  }
}
