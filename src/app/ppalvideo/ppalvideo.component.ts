import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Events } from '@ionic/angular';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-ppalvideo',
  templateUrl: './ppalvideo.component.html',
  styleUrls: ['./ppalvideo.component.scss']
})
export class PpalvideoComponent implements OnInit {
  @ViewChild('ppalslider') slider : IonSlides;
  // vppalP: string;
  apiPpal:VgAPI; 
  srcurl:string;
  // srctyp:string;
  // srcptr:string;
  srcctm:number; 

  constructor(public events: Events) {
    this.srcurl = "";
    this.srcctm = 0;

    events.subscribe('sp_pplmode-up', (pipApi: VgAPI, url: string) => {
      console.log(pipApi);
      console.log(url);
      if (url != this.srcurl && this.srcurl != "") {
        this.apiPpal.pause();
        this.srcurl = ""; 
      }
      this.srcurl = url;
      this.srcctm = pipApi.getDefaultMedia().currentTime;
    });

    events.subscribe('sp_pplmode-down', () => {
      this.srcurl = ""; 
      this.slider.slideTo(0);
    });
   }

   onPlayerReadyP(api: VgAPI) {
    this.apiPpal = api;
    this.apiPpal.getDefaultMedia().currentTime = this.srcctm;
    this.apiPpal.play();

    this.apiPpal.getDefaultMedia().subscriptions.ended.subscribe(() => { this.events.publish('sp_pplmode-down'); });

    // this.api.getDefaultMedia().subscriptions.pause.subscribe(() => { 
    //     if (this.sw) {
    //       let a = this.ctm;
    //       let b = this.vurl;
    //       this.events.publish('sp_pipmode-down');
    //       this.esperarVideo(a, b, this.movx, this.movy);
    //       this.sw = false;
    //     }
    //   });
  }

  ngOnInit() {
  }

  ppl(id: string, url: string) {
    // this.vppalP = url;
  }

  onPpalOut(){
    this.srcurl = ""; 
  }

  onSlideChanged(event){ 
    this.slider.slideTo(0);
    this.onPpalOut();
  }


}
