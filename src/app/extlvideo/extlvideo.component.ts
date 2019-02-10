import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import * as Plyr from 'plyr';
import * as Draggable from 'draggable';

@Component({
  selector: 'app-extlvideo',
  templateUrl: './extlvideo.component.html',
  styleUrls: ['./extlvideo.component.scss']
})
export class ExtlvideoComponent implements OnInit {
  player: Plyr;
  playeraux: Plyr;
  videocontenedor: HTMLElement;
  opciones: { setCursor: boolean; };
  conten: any;
  vurl: string = "";
  sw: boolean; 

  constructor(public events: Events) {
    this.sw = false;
    events.subscribe('sp_pipmode-up', (url: string, plyr : Plyr) => {
      this.sw = true;
      this.vurl = url;
      plyr.id = "plyrID";
      this.playeraux = plyr;
      // this.player = new Plyr('#plyrID', { captions: { active: true } });
      // this.player.on('ready', event => {
        // event.detail.plyr.play();
      // });
      // this.player.play();
    });

    events.subscribe('sp_pipmode-up2', () => {
      if(this.vurl!="")
      {
        this.player = this.playeraux;
        this.player = new Plyr('#plyrID', { captions: { active: true } });
        this.player.seekTime = this.playeraux.seekTime;
        this.player.on('ready', event => {
          event.detail.plyr.play();
        });
        this.player.play();  
      }
    });

    events.subscribe('sp_pipmode-down', () => {
      this.vurl = "";
      this.player.destroy();
    });
  }
    

  ngOnInit() {
    this.opciones = { setCursor: false };
    this.videocontenedor = document.getElementById('move');
    this.conten = new Draggable(this.videocontenedor, this.opciones);
    this.player = new Plyr('#plyrID', { captions: { active: true } });
  }

  validar(url: string){
    if (url!="" && this.sw)
    {
      this.events.publish('sp_pipmode-up2');
      this.sw = false;
    }
  }
}
