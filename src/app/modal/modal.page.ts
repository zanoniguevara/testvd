import { Component, OnInit, Injectable, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ModalController, NavController, IonSlides, IonProgressBar } from '@ionic/angular';
 

@Injectable()
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @ViewChild('slidesStories') slidesStories: IonSlides;
  @ViewChildren(IonProgressBar) progressbars: QueryList<IonProgressBar> ;
 


  jsonvideo;
  pbr = 0;
  timerId;
  imagenalgo = "";
  formatType = "";
  playpause : boolean;
  public slideOpts = {
    grabCursor: true,
    slidesPerView: 1,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }
  }

  person;
  inxact = 0;
  ipersona = 0;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.playpause  = true;
    this.jsonvideo =
      {
        'personas':
          [{
            'id' : '1',
            'name': 'Persona01',
            'stories': [
              { 'id': 'vd01', 'url': 'http://lorempixel.com/400/200/animals', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd02', 'url': 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'type': 'video', 'sw': 'false' },
              { 'id': 'vd03', 'url': 'https://vjs.zencdn.net/v/oceans.mp4', 'type': 'video', 'sw': 'false' },
              { 'id': 'vd04', 'url': 'http://lorempixel.com/400/200/animals', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd05', 'url': 'http://lorempixel.com/400/200/sports/Texto-de-prueba', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd01', 'url': 'http://lorempixel.com/400/200/animals', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd02', 'url': 'http://lorempixel.com/400/200/sports/2', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd03', 'url': 'http://lorempixel.com/g/400/200', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd04', 'url': 'http://lorempixel.com/400/200/animals', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd05', 'url': 'http://lorempixel.com/400/200/sports/Texto-de-prueba', 'type': 'image', 'sw': 'false' }]
          },
          {
            'id' : '2',
            'name': 'Persona03',
            'stories': [
              { 'id': 'vd03', 'url': 'http://atrum-blog.com/wp-content/uploads/2011/01/camaleon.jpg', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd04', 'url': 'http://lorempixel.com/g/400/200', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd05', 'url': 'http://atrum-blog.com/wp-content/uploads/2011/01/camaleon.jpg', 'type': 'image', 'sw': 'false' },]
          },
          {
            'id' : '3',
            'name': 'Persona04',
            'stories': [
              { 'id': 'vd03', 'url': 'http://lorempixel.com/g/400/200', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd04', 'url': 'http://lorempixel.com/400/200/animals', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd05', 'url': 'http://atrum-blog.com/wp-content/uploads/2011/01/camaleon.jpg', 'type': 'image', 'sw': 'false' },]
          },
          {
            'id' : '4',
            'name': 'Persona05',
            'stories': [
              { 'id': 'vd03', 'url': 'http://lorempixel.com/400/200/animals', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd04', 'url': 'http://lorempixel.com/g/400/200', 'type': 'image', 'sw': 'false' },
              { 'id': 'vd05', 'url': 'http://atrum-blog.com/wp-content/uploads/2011/01/camaleon.jpg', 'type': 'image', 'sw': 'false' },]
          },
          ],
      }
  }

  ngOnInit() {
    this.validateHistory(0);
  }

  async validateHistory(indexPer)
  {
    this.ipersona = indexPer;
    
    this.person = this.jsonvideo.personas[indexPer].stories;
    

    console.log("Estamos aqui");
    // console.log(this.progressbars.find(item => item. .getDefaultMedia().id.toString()===idvideo);

    if (this.person.length >= 0) { 

      this. formatType = ""
      setTimeout(() => {
        this.imagenalgo = this.person[0].url;
        this. formatType = this.person[0].type;
      }, 5);  

      this.inxact = 0;
    }
  }

  ionViewDidLoad() {
    console.log("Inicio");
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  cambiar(valor) {
    if (valor >= 1) {
      if (this.inxact == (this.person.length - 1)) {
        this.slidesStories.slideNext().then(
          (index)=>{
            console.log("Cambio Slide " + index);
         });


        // this.closeModal();
      }

      if (this.inxact <= (this.person.length - 1)) {
        this.inxact++;
        this.pbr = 0;

        this. formatType = ""
        setTimeout(() => {
          this.imagenalgo = this.person[this.inxact].url;
          this. formatType = this.person[this.inxact].type;
        }, 50);

      }
    }
  }

  cambiar2(valor) {
    if (valor >= 1) {
      if (this.inxact <= (this.person.length - 1)) {
        this.inxact = (this.inxact<=0?0:this.inxact--);
        this.pbr = 0;

        this. formatType = ""
        setTimeout(() => {
          this.imagenalgo = this.person[this.inxact].url;
          this. formatType = this.person[this.inxact].type;
        }, 50);   

        if ((this.inxact<=0?0:this.inxact--) == this.inxact)
          this._loaded(true);
      }
    }
  }

  loadBar2(time = 0) {
    this.pbr = time;
    clearInterval(this.timerId);
    this.timerId = setInterval(() => 
    {
      let br = this.pbr
      br = ((br + .01) >= 1 ? 1 : br + .01);
      this.pbr = br;
      if (this.pbr == 1)
      {
        this.clrInterval();
      }
    }
    , 100);
  }

  clrInterval() {
    clearInterval(this.timerId);
  }

  reanudeInterval() {
    this.loadBar2(this.pbr);
  }

  _loaded(isLoaded) {
    console.log(isLoaded);
    if (isLoaded) {
      this.loadBar2();
    }
  }

  async backward(){
    this.clrInterval();
    this.cambiar2(1)
     
  }
  
  async forward(){
    this.clrInterval();
    this.cambiar(1)
  }

  async onSlideChage(event) { 
    this.clrInterval();
    this.slidesStories.getActiveIndex().then(
      (index)=>{
        let p  =  index;
        this.validateHistory(p); 
     });
  }

  onPlayPause(){
    this.playpause = !this.playpause;
    if(this.playpause){
      this.reanudeInterval();
    }
    else{
      this.clrInterval();
    }
  }
}
