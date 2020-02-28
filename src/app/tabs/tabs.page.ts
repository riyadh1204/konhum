import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
declare var document;
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
fab:any;
  constructor(public navCtrl:NavController) {this.fab = false}

  clickTabButton(){
    this.fab = true
    console.log('Clicked')
    this.navCtrl.navigateRoot("/home/tabs/advokat");
  }

  clickTabButtonTrue(){
    this.fab = false
    console.log('Clicked')
    this.navCtrl.navigateRoot("/home/tabs/advokat");
  }

}
