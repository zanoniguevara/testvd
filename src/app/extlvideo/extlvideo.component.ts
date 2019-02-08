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
  // player: Plyr;
  videocontenedor: HTMLElement;
  opciones: { setCursor: boolean; };
  conten: any;
  vurl: string = "";

  constructor(public events: Events) {
    events.subscribe('sp_pipmode-up', (url: string) => {
      this.vurl = url;
      // this.player = new Plyr('#plyrID', { captions: { active: true } });
      // this.player.on('ready', event => {
      //   event.detail.plyr.play();
      // });
    });

    events.subscribe('sp_pipmode-down', () => {
      this.vurl = "";
      // this.player.destroy();
    });
  }
   
  salir() {
    this.events.publish('sp_pipmode-down');
    console.log("Movil");
  } 

  ngOnInit() {
    this.opciones = { setCursor: false };
    this.videocontenedor = document.getElementById('move');
    this.conten = new Draggable(this.videocontenedor, this.opciones);
    // this.player = new Plyr('#plyrID', { captions: { active: true } });
  }
}
