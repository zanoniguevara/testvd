import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { CdkDragEnd, CdkDragStart, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { VgAPI } from 'videogular2/core';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

// import * as Plyr from 'plyr';

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
  position = '';
 

  constructor(public events: Events) {
    this.sw = false;
    events.subscribe('sp_pipmode-up', (pipApi: VgAPI, url: string) => {
      // pipApi.getDefaultMedia().id =  "plyrID";
      // pipApi.play();

      console.log(url);
      console.log(this.vurl);
      if (url != this.vurl && this.vurl != ""){
        this.api.pause();
        this.vurl = "";
        console.log("Borrar1");
        this.sw = true;
      }
      
      this.vurl = url;
      this.ctm = pipApi.getDefaultMedia().currentTime;
      console.log("1");


      // pipApi.getDefaultMedia().id = this.api.getDefaultMedia().id;

      // plyr.id = "plyrID";
      // this.playeraux = plyr;
    });

    events.subscribe('sp_pipmode-up2', (ctm, url, x, y) => {
      
      this.vurl = url;
      this.ctm = ctm; 
      this.movx = x;
      this.movy = y;
    });

    events.subscribe('sp_pipmode-down', () => {
      this.vurl = "";
      // this.player.destroy();
    });
  }


  onPlayerReady(api: VgAPI) {
    this.api = api;
    console.log("Pasa por aqui?");
    console.log("3");
    console.log(this.api);
    this.api.getDefaultMedia().currentTime = this.ctm;
    this.api.play();

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        console.log("termino");
        this.events.publish('sp_pipmode-down');
      });
      this.api.getDefaultMedia().subscriptions.pause.subscribe(
        () => {
          console.log("Pauso");
           if (this.sw){
          console.log("termina");

          let a = this.ctm;
          let b = this.vurl;
          console.log(this.movx + "termina" + this.movy); 
            this.events.publish('sp_pipmode-down');
          console.log("comienza "  + a + "comienza" + b );
          this.esperarVideo( a, b, this.movx, this.movy);
          

          
            // this.events.publish('sp_pipmode-up2', a, b);
            this.sw = false;
           }
        });
        this.api.getDefaultMedia().subscriptions.play.subscribe(
          () => {
            console.log("Play");
             
          });
  }

  ngOnInit() {
    // this.player = new Plyr('#plyrID', { captions: { active: true } });
  }

  // validar(url: string) {
  //   if (url != "" && this.sw) {
  //     this.events.publish('sp_pipmode-up2');
  //     this.sw = false;
  //   }
  // }

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

  dragMoved(event: CdkDragMove, state) {
    this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
    this.movx = event.pointerPosition.x;
    this.movy = event.pointerPosition.y;
  }
 

  esperarVideo( a, b, x, y):Promise<any>{
    return new Promise<any>(
        (resolve) => {
            setTimeout(resolve, 5)
        }
    ).then(()=> {this.events.publish('sp_pipmode-up2', a, b, x, y); });
}
}
