import { Component, ViewChild } from '@angular/core';
import * as Plyr from 'plyr';
import { Events, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('ppalslider') slider : IonSlides;

  jsonvideo;
  players = [];
  videocontenedor: any;
  player: any;
  opciones: any;
  onPlay: string;
  vppalP: string; 

  constructor(public events: Events) {
    this.vppalP = "";
    this.onPlay = "";
    this.jsonvideo =
      {
        'name': 'Persona',
        'url': 'https://vjs.zencdn.net/v/oceans.mp4',
        'type': 'video/mp4',
        'videos': [
          { 'id': 'vd01', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' , 'poster' : 'http://video-js.zencoder.com/oceans-clip.jpg' },
          { 'id': 'vd02', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4' , 'poster' : 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg'},
          { 'id': 'vd03', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' , 'poster' : 'http://video-js.zencoder.com/oceans-clip.jpg'},
          { 'id': 'vd04', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4' , 'poster' : 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg'},
          { 'id': 'vd05', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' , 'poster' : 'http://video-js.zencoder.com/oceans-clip.jpg'},
          { 'id': 'vd06', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4', 'poster' : 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' },
          { 'id': 'vd07', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video/mp4' , 'poster' : 'http://video-js.zencoder.com/oceans-clip.jpg'},
          { 'id': 'vd08', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video/mp4', 'poster' : 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg' }
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
          let tmpplay = new Plyr('#' + this.onPlay);
          let tmpstop = new Plyr('#' + p.id);
          console.log(tmpplay);
          console.log(tmpstop);
          console.log("Parate");
        }
        this.onPlay = p.id;
      });
    });
  }

  pip(idvideo: string) {
    let tmp = new Plyr('#' + idvideo);
    tmp.stop();
    console.log(tmp);
    this.events.publish('sp_pipmode-up', tmp.media.currentSrc, tmp);
  }

  ppl(id: string, url: string) {
    this.vppalP = url;
  }

  onPpalOut(){
    this.vppalP = ""; 
  }

  onSlideChanged(event){ 
    this.slider.slideTo(0);
    this.onPpalOut();
  }
}
