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
  apiPpal:VgAPI; 
  srcurl:string;
  srcctm:number; 
  swppal: boolean; 

  constructor(public events: Events) {
    this.srcurl = "";
    this.srcctm = 0;
    this.swppal = false;

    events.subscribe('sp_pplmode-up', (pplApi: VgAPI, url: string) => {
      console.log(pplApi);
      console.log(url);
      if (url != this.srcurl && this.srcurl != "") {
        this.apiPpal.pause();
        this.srcurl = ""; 
        this.swppal = true;
      }
      this.srcurl = url;
      this.srcctm = pplApi.getDefaultMedia().currentTime;
    });

    events.subscribe('sp_pplmode-up2', (ctm, url) => {
      this.srcurl = url;
      this.srcctm = ctm; 
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

    this.apiPpal.getDefaultMedia().subscriptions.pause.subscribe(() => { 
      if (this.swppal) {
        let a = this.srcctm;
        let b = this.srcurl;
        this.events.publish('sp_pplmode-down');
        this.esperarVideo(a, b);
        this.swppal = false;
      }
    });
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

  esperarVideo(a, b): Promise<any> {
    return new Promise<any>(
      (resolve) => {
        setTimeout(resolve, 5)
      }
    ).then(() => { this.events.publish('sp_pplmode-up2', a, b); });
  }
}
