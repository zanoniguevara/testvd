import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular'; 
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-extlvideo',
  templateUrl: './extlvideo.component.html',
  styleUrls: ['./extlvideo.component.scss']
})

export class ExtlvideoComponent implements OnInit {
  vurl: string = "";
  sw: boolean;
  vctp: boolean; 
  api: VgAPI;
  ctm: number = 0;
  state = '';
  estilo:any;

  constructor(public events: Events) {
    this.sw = false;
    this.vctp = false;
    this.estilo = {width: "200px", height: "auto" }

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
    });

    events.subscribe('sp_pipmode-down', () => {
      this.vurl = "";
    });
  }

  onPlayerReadyPip(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().currentTime = this.ctm;
    this.api.play();

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {this.events.publish('sp_pipmode-down'); });

    this.api.getDefaultMedia().subscriptions.pause.subscribe(() => {
      if (this.sw) {
        let a = this.ctm;
        let b = this.vurl;
        this.events.publish('sp_pipmode-down');
        this.esperarVideo(a, b);
        this.sw = false;
      }
    });

    this.api.fsAPI.onChangeFullscreen.subscribe((event) => { this.toggleFullscreenPip(event); });
  }

  ngOnInit() { }
  
  esperarVideo(a, b): Promise<any> {
    return new Promise<any>(
      (resolve) => {
        setTimeout(resolve, 5)
      }
    ).then(() => { this.events.publish('sp_pipmode-up2', a, b); });
  }

  toggleFullscreenPip($event) {
    this.vctp = $event;
  } 

  onMoveEnd($event){
    if ($event.x <= 0) { 
      this.events.publish('sp_pipmode-down'); 
    }
  } 
  onResizeStop($event){
    this.estilo.width = $event.size.width + "px"
    this.estilo.height = "auto"; 
    $event.size.height = "auto"; 
  }
}
