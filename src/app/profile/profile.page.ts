import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {
  GooglePlus
} from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { Router } from '@angular/router';

import { Http,Headers } from '@angular/http';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  login:any;
  data:any;
  nama:any;
  data2:any;
  user_id:any;
  constructor(private platform: Platform,
   public events:Events,public router: Router,public http:Http,public loadingCtrl:LoadingController,public navCtrl:NavController,public storage:Storage,private googlePlus: GooglePlus,private fb: Facebook) 
    { 
     
    this.storage.get('login').then((val) => {
      this.login = val
      console.log('login :', this.login);
    })
    this.storage.get('user_id').then((val) => {
      this.user_id = val
      console.log('user_id :', this.user_id);
    })

    events.subscribe('user:created', () => {
      this.getData();
    });
  
  }

  

 

  ionViewDidEnter(){
    this.getData()
  }

  ngOnInit() {
  }

  async getData(){
  
    this.storage.get('user_id').then((val) => {
    console.log('user_id :', val);
        
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
      
    this.http.get("http://konsultasihukum.livingpay.id/api/profile/" + val + "/edit" , {
      headers: headers
    })
    .subscribe(data => {
      console.log(data.json());
      this.data = data.json().user.foto;
      this.nama = data.json().user.nama
      }, error => {
        console.log(error.json());
      });
    });
    };

  ubahData(){
    this.navCtrl.navigateForward('/ubahdatadiri')
  }

  riwayat(){
    this.navCtrl.navigateForward('/riwayattransaksi')
  }

  kontak(){
    this.navCtrl.navigateForward('/kontakkami')
  }

  syarat(){      
    this.navCtrl.navigateForward('/syarat')
    
  }

  pengaturan(){
    this.navCtrl.navigateForward('/pengaturan')
  }

  tentang(){
    this.navCtrl.navigateForward('/tentangkami')
  }

  async logoutPost(){
    
 
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    this.http.post("http://konsultasihukum.livingpay.id/api/logout/" + this.user_id , {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.loadingCtrl.dismiss().then(a => console.log('Selesai'));
      }, error => {
        console.log(error.json());
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
  }

  

  async logout(){
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu ..',
      duration: 2000
    });
    await loading.present();
   
    if(this.login == 'normal'){
      this.navCtrl.navigateRoot('/');
      this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
      this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
      this.storage.remove('token').then(a => console.log('Hapus Token'));
      this.storage.remove('user').then(a => console.log('Hapus User'));
      this.data = null
      this.nama = null
      this.logoutPost()
     
    }
    
    if(this.login == 'google'){
      this.googlePlus.logout()
          console.log('Google logout success');
          this.navCtrl.navigateRoot('/');
          this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
          this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
          this.storage.remove('token').then(a => console.log('Hapus Token'));
          this.storage.remove('user').then(a => console.log('Hapus User'));
          this.data = null
          this.nama = null
          this.logoutPost()
          
    }
    
    if (this.login == 'facebook') {
      this.fb.logout().then(a => console.log('logout fb'));
      this.navCtrl.navigateRoot('/');
      this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
      this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
      this.storage.remove('token').then(a => console.log('Hapus Token'));
      this.storage.remove('user').then(a => console.log('Hapus User'));
      this.data = null
      this.nama = null
      this.logoutPost()

    }
  }

}
