import { Component, OnInit } from '@angular/core';
import {
  Http,
  RequestOptions,
  Headers
} from '@angular/http';
import { NavController} from '@ionic/angular';
import { SendDataService } from '../send-data.service';

@Component({
  selector: 'app-advokat',
  templateUrl: './advokat.page.html',
  styleUrls: ['./advokat.page.scss'],
})
export class AdvokatPage implements OnInit {

  data: any;
  nama_advokat: any;
  spesialisasi: any;
  wilayah: any;
  key: any;
  statusSemua:any;
  statusSpesialis:any;
  statusKonsultan:any;

  constructor(private http: Http, public navCtrl: NavController, public sendData: SendDataService) {  
    this.statusSemua = true;
    this.getDataAdvokat()
  }


  ngOnInit() {
  }

  searchData(ev: any){
    const keyword = ev.target.value;
      let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
      this.http.get("http://konsultasihukum.livingpay.id/api/search/advokat?keyword=" + keyword , {
          headers: headers
        })
        .subscribe(
          data => {
            console.log(data)
            this.data = data.json();
            console.log(this.data)
          }, (err) => {});
 
  }

  profilAdvokat(advokat){
    this.sendData.setData(advokat);
    this.navCtrl.navigateForward('/profil-advokat')
  }

  getDataAdvokat() {
    this.statusKonsultan = false;
    this.statusSemua = true;
    this.statusSpesialis = false;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const requestOptions = new RequestOptions({
      headers: headers
    });
    
  
    this.http.get('http://konsultasihukum.livingpay.id/api/advokat')
    .subscribe(data => {
      this.data = data.json().advokat
      console.log(data.status);
      console.log(data.json()); // data received by server
      console.log(data.headers);
  
    }, error => {
  
      console.log(error);
   
  
    });
  }

  filterSpesialis(){

    this.statusKonsultan = false;
    this.statusSemua = false;
    this.statusSpesialis = true;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    
    const body = {
      nama_advokat : this.nama_advokat,
      spesialisasi : this.spesialisasi,
      wilayah : this.wilayah
    }
    
  
    this.http.post('http://konsultasihukum.livingpay.id/api/filter/spesialis', body, {
      headers: headers
    })
    .subscribe(data => {
      this.data = data.json().advokat
      console.log(data.status);
      console.log(data.json()); // data received by server
      console.log(data.headers);
  
    }, error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }

  filterKonsultan(){

    this.statusKonsultan = true;
    this.statusSemua = false;
    this.statusSpesialis = false;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    
    const body = {
      nama_advokat : this.nama_advokat,
      spesialisasi : this.spesialisasi,
      wilayah : this.wilayah
    }
    
  
    this.http.post('http://konsultasihukum.livingpay.id/api/filter/konsultan', body, {
      headers: headers
    })
    .subscribe(data => {
      this.data = data.json().advokat
      console.log(data.status);
      console.log(data.json()); // data received by server
      console.log(data.headers);
  
    }, error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });

  }

}
