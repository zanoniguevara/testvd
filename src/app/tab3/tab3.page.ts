import { Component, Injectable } from '@angular/core';
import { bind } from '@angular/core/src/render3';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  /**
   *
   */

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) { }


  async openModal() {
    let modal = await this.modalCtrl.create({component : ModalPage});
    await modal.present();
  }
}
