import { Component } from '@angular/core';
// import * as Plyr from 'plyr';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  public player;

  ngOnInit() {
        // this.player = new Plyr('#plyrID', { captions: { active: true } });
    // this.player = new Plyr(this.videoDivComponent.nativeElement, { captions: { active: true } });
  }

  // pip() {

  //   this.player.pip = !this.player.pip;
  // }

  // airp() {

  //   this.player.airplay();
  // }

}
