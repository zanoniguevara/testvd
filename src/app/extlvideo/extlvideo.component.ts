import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { CdkDragEnd, CdkDragStart, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';

import { VgAPI } from 'videogular2/core';
@Component({
  selector: 'app-extlvideo',
  templateUrl: './extlvideo.component.html',
  styleUrls: ['./extlvideo.component.scss']
})

export class ExtlvideoComponent implements OnInit {
  vurl: string = "";
  sw: boolean;
  movx: number = 0;
  movy: number = 0;
  api: VgAPI;
  ctm: number = 0;
  state = '';

  constructor(public events: Events) {
    this.sw = false;
    events.subscribe('sp_pipmode-up', (pipApi: VgAPI, url: string) => {
      if (url != this.vurl && this.vurl != "") {
        this.api.pause();
        this.vurl = "";
        this.sw = true;
      }
      this.vurl = url;
      this.ctm = pipApi.getDefaultMedia().currentTime;
    });

    events.subscribe('sp_pipmode-up2', (ctm, url, x, y) => {
      this.vurl = url;
      this.ctm = ctm;
      this.movx = x;
      this.movy = y;
    });

    events.subscribe('sp_pipmode-down', () => {
      this.vurl = "";
    });
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().currentTime = this.ctm;
    this.api.play();

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => { this.events.publish('sp_pipmode-down'); });
    
    this.api.getDefaultMedia().subscriptions.pause.subscribe(() => { 
        if (this.sw) {
          let a = this.ctm;
          let b = this.vurl;
          this.events.publish('sp_pipmode-down');
          this.esperarVideo(a, b, this.movx, this.movy);
          this.sw = false;
        }
      });
  }

  ngOnInit() {}

  onDragFactory() {
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
    if (this.movx <= 20) {
      this.events.publish('sp_pipmode-down');
      const source: any = event.source
      source._passiveTransform = { x: 50, y: 50 };
    }
  }

  dragMoved(event: CdkDragMove) {
    this.movx = event.pointerPosition.x;
    this.movy = event.pointerPosition.y;
  }


  esperarVideo(a, b, x, y): Promise<any> {
    return new Promise<any>(
      (resolve) => {
        setTimeout(resolve, 5)
      }
    ).then(() => { this.events.publish('sp_pipmode-up2', a, b, x, y); });
  }
}
