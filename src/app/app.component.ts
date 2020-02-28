import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  google:any;
  token:any;
  datadiri:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl:NavController,
    private storage: Storage
  ) {
    this.storage.get('token').then((val) => {
      this.token = val
      this.storage.get('datadiri').then((val) => {
        this.datadiri = val
        this.initializeApp();
        console.log('datadiri :', this.datadiri);
      });
      console.log('token :', this.token);
    });

    this.storage.get('datadiri').then((val) => {
      this.datadiri = val
      this.initializeApp();
      console.log('datadiri :', this.datadiri);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log(this.token)
      if(this.token != null) { 
        if (this.datadiri.jenis_kelamin == null) {
          this.navCtrl.navigateRoot("/datadiri");
        } else {
          
          this.navCtrl.navigateRoot("/home/tabs/home");
        }
      } else {
        this.navCtrl.navigateRoot("/")
      }
      this.statusBar.backgroundColorByHexString('#D3D3D3');
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
