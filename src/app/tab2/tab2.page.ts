import { Component, ViewChild } from '@angular/core';

declare var videojs: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('my_video_1') my_video_1: any;

  public player2;
  options = {};

  ngOnInit() {
/*
    Actualmente Funciona 
    this.player2 = new videojs(this.my_video_1.nativeElement, {}, () => {
      videojs.log('Your player is ready!');
    }).ready(function() {
      var myPlayer = this; // When the player is ready, get a reference to it
      myPlayer.log('Para el PIP!'); // Initialize the picture-in-picture plugin
    });;
    console.log(this.player2);
*/

    this.player2 = new videojs.getPlayer(this.my_video_1.nativeElement).ready(function() {
       var myPlayer = this,
          options = {'scale': 0.5, posX : "left" };
      myPlayer.pip(options);
    });

  }


  pip() { 
    this.player2.play();
  }
}
