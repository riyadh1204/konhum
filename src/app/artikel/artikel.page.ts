import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';
import { LoadingController, NavController,Events } from '@ionic/angular';
import { SendDataService } from '../send-data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.page.html',
  styleUrls: ['./artikel.page.scss'],
})
export class ArtikelPage implements OnInit {
  data:any;
  image:any;
  constructor(public events:Events,private sanitization: DomSanitizer,public sendData: SendDataService,public storage:Storage,public http:Http,public loadingCtrl:LoadingController,public navCtrl:NavController) { 
    this.getData() 
    events.subscribe('berita:change', () => {
      this.getData();
    });
  }
  ngOnInit() {
  }

  searchData(ev: any){

    const keyword = ev.target.value;
    
    
      let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");


      this.http.get("http://konsultasihukum.livingpay.id/api/search/artikel?keyword=" + keyword , {
          headers: headers
        })
        .subscribe(
          data => {
            console.log(data)
            this.data = data.json();
            console.log(this.data)
          }, (err) => {});
 

  }
  
  beritaBanner(){
    const body =
    {
      artikel:this.data[0].artikel,
      created_at:this.data[0].created_at,
      id:this.data[0].id,
      isi:this.data[0].isi,
      judul:this.data[0].judul,
      likes_count:this.data[0].likes_count,
      updated_at:this.data[0].updated_at
    }
    this.sendData.setData(body);
    this.navCtrl.navigateForward('/berita') 
  }

  berita(item){
    this.sendData.setData(item);
    this.navCtrl.navigateForward('/berita')
  }


  async getData(){
   
  
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
    
  this.http.get("http://konsultasihukum.livingpay.id/api/artikel-baru" , {
    headers: headers
  })
  .subscribe(data => {
    this.data = data.json().artikel;
    

    console.log(this.data);
    
    }, error => {
      console.log(error.json());
    });
  }


}
