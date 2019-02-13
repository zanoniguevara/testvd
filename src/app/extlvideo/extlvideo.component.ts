import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import {CdkDragEnd, CdkDragStart, CdkDragMove, DragDropModule} from '@angular/cdk/drag-drop';

import * as Plyr from 'plyr';

@Component({
  selector: 'app-extlvideo',
  templateUrl: './extlvideo.component.html',
  styleUrls: ['./extlvideo.component.scss']
})
export class ExtlvideoComponent implements OnInit {
  player: Plyr;
  playeraux: Plyr;
  vurl: string = "";
  sw: boolean; 
  movx : number = 0;
  movy : number = 0;

  state = '';
  position = '';

  constructor(public events: Events) {
    this.sw = false;
    events.subscribe('sp_pipmode-up', (url: string, plyr : Plyr) => {
      this.sw = true;
      this.vurl = url;
      plyr.id = "plyrID";
      this.playeraux = plyr;
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
        console.log(this.playeraux.media.currentTime);
        this.player.media.currentTime = this.playeraux.media.currentTime;
        this.player.play();  
      }
    });

    events.subscribe('sp_pipmode-down', () => {
      this.vurl = "";
      this.player.destroy();
    });
  }
    

  ngOnInit() { 
    this.player = new Plyr('#plyrID', { captions: { active: true } });
  }

  validar(url: string){
    if (url!="" && this.sw)
    {
      this.events.publish('sp_pipmode-up2');
      this.sw = false;
    }
  }

  onDragFactory(){
    return function (element, x, y) {
      this.movx = x;
      this.movy = y;
  }
  }

  dragStarted(event: CdkDragStart) {
    this.state = 'dragStarted';
  }
 
  dragEnded(event: CdkDragEnd) {
    this.state = 'dragEnded';
    
    if (this.movx <= 20 )
    {
      this.events.publish('sp_pipmode-down');
      const source: any = event.source
      source._passiveTransform = { x: 50, y: 50 };
    }
  }
 
  dragMoved(event: CdkDragMove, state) {
    this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
    this.movx =  event.pointerPosition.x;
    this.movy = event.pointerPosition.y;
    
  } 
}
