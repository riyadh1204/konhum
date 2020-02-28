import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


import { FileTransfer } from '@ionic-native/file-transfer/ngx';
@Component({
  selector: 'app-syarat',
  templateUrl: './syarat.page.html',
  styleUrls: ['./syarat.page.scss'],
})
export class SyaratPage implements OnInit {

 
  data:any
  
  constructor(public http:Http,private loadingCtrl:LoadingController) { 
    this.getData() 
  }

  

 

  ngOnInit() {
  }


  async getData(){
   
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
    
  this.http.get("http://konsultasihukum.livingpay.id/api/syarat-ketentuan" , {
    headers: headers
  })
  .subscribe(data => {
    this.data = data.json().syaratDanKetentuan['0'];
    console.log(this.data);
    }, error => {
      console.log(error.json());
    });
  };
  

}
