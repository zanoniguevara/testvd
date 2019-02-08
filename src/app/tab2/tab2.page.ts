import { Component } from '@angular/core';
import * as Plyr from 'plyr';
import { Events } from '@ionic/angular';

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
  vppalP: string;
  swpip : boolean = false;

  constructor(public events: Events) {
    this.vppalP = "";
    this.onPlay = "";
    this.jsonvideo =
      {
        'name': 'Persona',
        'url': 'https://vjs.zencdn.net/v/oceans.mp4',
        'type': 'video/mp4',
        'videos': [
          { 'id': 'vd01', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' },
          { 'id': 'vd02', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4' },
          { 'id': 'vd03', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' },
          { 'id': 'vd04', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4' },
          { 'id': 'vd05', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' },
          { 'id': 'vd06', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4' },
          { 'id': 'vd07', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' },
          { 'id': 'vd08', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4' }
        ]
      }
  }

  ngOnInit() {
    this.player = new Plyr('#vppalP');
    this.player.on('play', event => {
      const instance = event.detail.plyr;
      console.log(event);
    });

  }

  ngAfterViewInit() {
    this.aver();
  }

  aver() {
    this.players = Array.from(document.querySelectorAll('.videocard')).map(p => {
      let v = new Plyr(p);
      v.on('play', event => {
        console.log("Playyy!!!");
        console.log(this.onPlay + " alla aqui " + p.id);

        if (this.onPlay != "" && this.onPlay != p.id) {
          let y: any;
          y = document.getElementById(this.onPlay);
          console.log("Parate");
        }
        this.onPlay = p.id;
      });
    });
  }

  pip(idvideo: string) {
    let tmp = new Plyr('#' + idvideo);
    this.events.publish('sp_pipmode-up', tmp.media.currentSrc);
    this.swpip = true;
  }

  ppl(id: string, url: string) {
    this.vppalP = url;
    // this.players[id].play();
  }

  nopip(){
    this.events.publish('sp_pipmode-down');
    this.swpip = false;
  }
  
  onPpalOut(){
    this.vppalP = ""; 
  }

}
