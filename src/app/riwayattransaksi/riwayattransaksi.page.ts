import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http,Headers } from '@angular/http';
import { LoadingController, NavController } from '@ionic/angular';
import { SendDataService } from '../send-data.service';
@Component({
  selector: 'app-riwayattransaksi',
  templateUrl: './riwayattransaksi.page.html',
  styleUrls: ['./riwayattransaksi.page.scss'],
})
export class RiwayattransaksiPage implements OnInit {
  
  data:any
  
  constructor(public sendData: SendDataService,public storage:Storage,public http:Http,public loadingCtrl:LoadingController,public navCtrl:NavController) { 
    this.getData() 
  }

  ngOnInit() {
  }

  dataTransaksi(item){
    this.sendData.setData(item);
    this.navCtrl.navigateForward('/datatransaksi')
  }

  async getData(){
  
  this.storage.get('user_id').then((val) => {
  console.log('user_id :', val);
      
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
    
  this.http.get("http://konsultasihukum.livingpay.id/api/transaksi/" + val , {
    headers: headers
  })
  .subscribe(data => {
    console.log(data.json());
    this.data = data.json();
    
    }, error => {
      console.log(error.json());
    });
  });
  };

}
