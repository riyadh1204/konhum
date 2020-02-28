import { Component, OnInit } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { SendDataService } from '../send-data.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.page.html',
  styleUrls: ['./livechat.page.scss'],
})
export class LivechatPage implements OnInit {
  advokatOnline:any;
  lat1:any;
  lat2:any;
  lon1:any;
  lon2:any;
  km:any;
  terdekat = [];
  advokatTerdekat :any;
  advokatOnline3:any;
  advokatOnline2:any;
  dataLokasi:any;
  constructor(public storage:Storage,public http:Http,public sendData:SendDataService,public navCtrl:NavController) {this. getData()
    this.storage.get('lokasi').then((val) => {
      console.log('lokasi :', val);
      this.dataLokasi = val
      this.lat1 = this.dataLokasi.lat;
      this.lon1 = this.dataLokasi.lng;
    }) 
    this.advokatTerdekat = null
    this.terdekat = [];
    this.getDataAdvokatTerdekat()
  }

  ngOnInit() {
  }

  profilAdvokat(body){
    
    this.sendData.setData(body);
    this.navCtrl.navigateForward('/profil-advokat')
  }

  profilAdvokat2(){
    const body = {
      bahasa: this.advokatOnline.advokat[0].bahasa,
      biaya: this.advokatOnline.advokat[0].biaya,
      created_at: this.advokatOnline.advokat[0].created_at,
      id: this.advokatOnline.advokat[0].id,
      lama_pengalaman: this.advokatOnline.advokat[0].lama_pengalaman,
      lat: this.advokatOnline.advokat[0].lat,
      lng: this.advokatOnline.advokat[0].lng,
      pendidikan: this.advokatOnline.advokat[0].pendidikan,
      rating: this.advokatOnline.advokat[0].rating,
      spesialisasi: this.advokatOnline.advokat[0].spesialisasi,
      user_id: this.advokatOnline.advokat[0].user_id,
      wilayah: this.advokatOnline.advokat[0].wilayah,
      user : {
            alamat: this.advokatOnline.advokat[0].user.alamat,
            created_at: this.advokatOnline.advokat[0].user.created_at,
            email: this.advokatOnline.advokat[0].user.email,
            foto: this.advokatOnline.advokat[0].user.foto,
            id: this.advokatOnline.advokat[0].user.id,
            jenis_kelamin: this.advokatOnline.advokat[0].user.jenis_kelamin,
            nama: this.advokatOnline.advokat[0].user.nama,
            no_telepon: this.advokatOnline.advokat[0].user.no_telepon,
            online: this.advokatOnline.advokat[0].user.online,
            reset_token: this.advokatOnline.advokat[0].user.reset_token,
            role: this.advokatOnline.advokat[0].user.role,
            status: this.advokatOnline.advokat[0].user.status,
            tanggal_lahir: this.advokatOnline.advokat[0].user.tanggal_lahir,
            updated_at: this.advokatOnline.advokat[0].user.updated_at
      }
    }
    this.sendData.setData(body);
    this.navCtrl.navigateForward('/profil-advokat')
  }

  getData() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const requestOptions = new RequestOptions({
      headers: headers
    });
    
    this.http.get('http://konsultasihukum.livingpay.id/api/show/advokat/online',)
    .subscribe(data => {
      console.log(data)
      if (data.json().advokat.length > 5) {
        this.advokatOnline3 = data.json();
        this.advokatOnline3.advokat.length = 5
      } else {
        this.advokatOnline3 = data.json();
      }
      this.advokatOnline = data.json();
      for(let item of this.advokatOnline.advokat) {
        this.getDistanceFromLatLonInKm(item)
      }
      console.log(this.advokatOnline)
       
     
    }, error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }

  
  async getDataAdvokatTerdekat(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
      
    this.http.get("http://konsultasihukum.livingpay.id/api/advokat" , {
      headers: headers
    })
    .subscribe(data => {
      this.advokatOnline2 = data.json();
      console.log(this.advokatOnline2);
      for (let item of this.advokatOnline2.advokat) {
        this.getDistanceFromLatLonInKm(item)
      }
  
      
      }, error => {
        console.log(error.json());
      });
    }

    getDistanceFromLatLonInKm2(item) {
      console.log(item)
      
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(item.lat-this.lat1);  // deg2rad below
      var dLon = this.deg2rad(item.lng-this.lon1); 
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(item.lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      var e = Math.round(d);
      console.log(e)
  

     return e
      }

      advokat(){
        this.navCtrl.navigateRoot("/tabs/advokat");
      }


    getDistanceFromLatLonInKm(item) {
      console.log(item)
      
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(item.lat-this.lat1);  // deg2rad below
      var dLon = this.deg2rad(item.lng-this.lon1); 
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(item.lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      console.log(d)
      var e = Math.round(d);
      this.terdekat.push(e);
      console.log(this.terdekat)
      var f = this.terdekat
      this.advokatTerdekat = Math.min(...f)
      console.log(this.advokatTerdekat)
  

     
      }

     deg2rad(deg) {
      return deg * (Math.PI/180)
    }

  myFunction(item){

  }

}