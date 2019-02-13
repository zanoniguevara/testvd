import { Component } from '@angular/core';
import * as Plyr from 'plyr';
// import * as Draggable from 'draggable';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // conten: Draggable;
  videocontenedor:any;
  player: any;
  opciones: any;
 
  constructor() {
    
  }
  ngOnInit() {
    this.player = new Plyr('#plyrID', { captions: { active: true } });
    this.videocontenedor = document.getElementById('move');
    this.opciones = {
        setCursor: true
        // onDrag: function (element, x, y) {
          // 	labelY.innerHTML = y;
          // }
          // 	labelX.innerHTML = x;
      };
  }
  pip() {
    // this.conten = new Draggable(this.videocontenedor, this.opciones);
  }
  pipno() {
    // console.log(this.conten.get.x());
    // this.conten.destroy();
    this.videocontenedor.style.position = "unset";
  }
}
