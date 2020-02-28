import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { LoadingController, NavController,Events } from '@ionic/angular';
import { SendDataService } from '../send-data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  banner:any;
  advokatOnline:any;
  advokatOnline3:any;
  advokatOnline2:any;
  data:any;
  dataArtikel:any;
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    loop:true
  };
  slideOpts2 = {
    slidesPerView: 2,
    spaceBetween: 0,
    loop:true
  };
  terdekat = [];
  advokatTerdekat :any;
  lat1:any;
  lat2:any;
  lon1:any;
  lon2:any;
  km:any;
  dataLokasi:any;
  constructor(public storage:Storage,public geolocation:Geolocation,public http:Http,public sendData: SendDataService,public navCtrl:NavController) {
    this.advokatTerdekat = null
    this.terdekat = [];
    this.getData()
    this.getDataArtikel()
    this.getDataAdvokatOnline()
    this.myLocation()
    this.getDataAdvokatTerdekat()
   }

   myLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("Lat",resp.coords.latitude);
      console.log("Lng",resp.coords.longitude);
      this.lat1 = resp.coords.latitude;
      this.lon1 = resp.coords.longitude;
      const body = {
        lat:resp.coords.latitude,
        lng:resp.coords.longitude
      }
      this.storage.set('lokasi',body)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
   }


   back(){
     this.data = null
   }

  ngOnInit() {
  }

  

  profilAdvokat(advokat){
    this.sendData.setData(advokat);
    this.navCtrl.navigateForward('/profil-advokat')
  }

  livechat(){
    this.navCtrl.navigateForward('/livechat')
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

  berita(item){
 console.log(item);
  }

  async getDataArtikel(){
   
  
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
      
    this.http.get("http://konsultasihukum.livingpay.id/api/artikel" , {
      headers: headers
    })
    .subscribe(data => {
      this.dataArtikel = data.json().artikel;
      
  
      console.log(this.dataArtikel);
      
      }, error => {
        console.log(error.json());
      });
    }
  artikel(){
    this.navCtrl.navigateForward('/home/tabs/artikel')
  }
  async getData(){
   
  
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
      
    this.http.get("http://konsultasihukum.livingpay.id/api/banner" , {
      headers: headers
    })
    .subscribe(data => {
      this.banner = data.json().banner;
      
  
      console.log(this.banner);
      
      }, error => {
        console.log(error.json());
      });
    }

    async getDataAdvokatOnline(){
   
  
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.get("http://konsultasihukum.livingpay.id/api/show/advokat/online" , {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json())
        if (data.json().advokat.length > 5) {
          this.advokatOnline3 = data.json();
          this.advokatOnline3.advokat.length = 5
        } else {
          this.advokatOnline3 = data.json();
        }
        this.advokatOnline = data.json();
           
        }, error => {
          console.log(error.json());
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
    
         deg2rad(deg) {
          return deg * (Math.PI/180)
        }



  async getBanner(){

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
      
    this.http.get("http://konsultasihukum.livingpay.id/api/banner" , {
      headers: headers
    })
    .subscribe(data => {
      console.log(data.json());
      this.banner = data.json().banner;
      }, error => {
        console.log(error.json());
       
      });
}

}
