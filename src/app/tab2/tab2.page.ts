import { Component } from '@angular/core';
import * as videojs from 'video.js';
// import * as videojspip from 'videojs-pip';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public player2;
  options = {};

  // ngOnInit() {
  //   try {
  //     // setup the player via the unique element ID
  //     var element = document.getElementById('videoPlayer');
  //     if (element == null) {
  //       throw "error loading blah";
  //     }
  //     // if we get here, all good!
  //     videojs(element, {}, () => { });
  //     videojs.play();
  //   }
  //   catch (e) {
  //   }
  // }

  ngOnInit() { 
    this.player2 = videojs('my_video_1');
    
    // , this.options, function onPlayerReady() {
    //   videojs.log('Your player is ready!');
    
    //   // In this context, `this` is the player that was created by Video.js.
    //   this.play();
    
    //   // How about an event listener?
    //   this.on('ended', function() {
    //     videojs.log('Awww...over so soon?!');
    //   });
    // });


    // this.videoJSplayer = videojs('#plyrID', {}, function onPlayerReady() {
    //   videojs.log('Your player is ready!');
    
    //   // In this context, `this` is the player that was created by Video.js.
    //   this.play();
    
    //   // How about an event listener?
    //   this.on('ended', function() {
    //     videojs.log('Awww...over so soon?!');
    //   });
    // });
  }

  
  pip() {

    this.player2.play();
  }
}
