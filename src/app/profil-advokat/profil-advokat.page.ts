import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../send-data.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';

@Component({
  selector: 'app-profil-advokat',
  templateUrl: './profil-advokat.page.html',
  styleUrls: ['./profil-advokat.page.scss'],
})
export class ProfilAdvokatPage implements OnInit {
  status:any;
  item: any;
  data: any;
  id:any;
  userData:any
  constructor(public storage:Storage,public http:Http,public sendData: SendDataService, public navCtrl: NavController) { 
    this.data = this.sendData.getData();
    console.log(this.data)
    this.getData()
    this.status = 0;
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
      this.userData = data.json()
      }, error => {
        console.log(error.json());
      });
    });
    };


  ionViewWillEnter(){
    this.id = setInterval( () => {
      this.Check2();
      }, 2000);   
   }

   ionViewWillLeave(){
    clearInterval(this.id);
   }  

   chat(){ 
     
    this.storage.get('user_id').then((val) => {
    console.log('user_id :', val);
        
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

      const body = {
        user_id:val,
        advokat_id:this.data.id
      }

    this.http.post("http://konsultasihukum.livingpay.id/api/chat",body, {
      headers: headers
    })
    .subscribe(data => {
      console.log(data.json());
      const body ={
        
        advokat:{
          bahasa:this.data.bahasa,
          biaya:this.data.biaya,
          created_at:this.data.created_at,
          id:this.data.id,
          lama_pengalaman:this.data.lama_pengalaman,
          lat:this.data.lat,
          lng:this.data.lng,
          pendidikan:this.data.pendidikan,
          spesialisasi:this.data.spesialisasi,
          updated_at:this.data.updated_at,
          user:{
            alamat: this.data.user.alamat,
            created_at: this.data.user.created_at,
            email: this.data.user.email,
            foto: this.data.user.foto,
            id: this.data.user.id,
            jenis_kelamin: this.data.user.jenis_kelamin,
            nama: this.data.user.nama,
            no_telepon: this.data.user.no_telepon,
            online: this.data.user.online,
            reset_token: this.data.user.reset_token,
            role: this.data.user.role,
            status: this.data.user.status,
            tanggal_lahir: this.data.user.tanggal_lahir,
            updated_at: this.data.user.updated_at},
          user_id:this.data.user_id,
          wilayah:this.data.wilayah
        },
        advokat_id:data.json().chat_room.advokat_id,
        chat_session:{
          0:{
            chat_messages:{},
            chat_room_id:data.json().chat_session.chat_room_id,
            created_at:data.json().chat_session.created_at,
            id:data.json().chat_session.id,
            updated_at:data.json().chat_session.updated_at
          }
        },
        created_at:data.json().chat_room.created_at,
        id:data.json().chat_room.id,
        updated_at:data.json().chat_room.updated_at,
        user:{
          alamat: this.userData.user.alamat,
          created_at: this.userData.user.created_at,
          email: this.userData.user.email,
          foto: this.userData.user.foto,
          id: this.userData.user.id,
          jenis_kelamin: this.userData.user.jenis_kelamin,
          nama: this.userData.user.nama,
          no_telepon: this.userData.user.no_telepon,
          online:this.userData.user.online,
          reset_token: this.userData.user.reset_token,
          role: this.userData.user.role,
          status: this.userData.user.status,
          tanggal_lahir: this.userData.user.tanggal_lahir,
          updated_at: this.userData.user.updated_at
        },
        user_id:this.userData.user.id
      }
      console.log(body);
      this.sendData.setData(body);
      this.navCtrl.navigateForward('/chatmsg')
      }, error => {
        console.log(error.json());
        
      });
    });
  
   }

   async Check2(){

    this.storage.get('user_id').then((val) => {
    console.log('user_id :', val);
        
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
      
    this.http.get("http://konsultasihukum.livingpay.id/api/cek/transaksi/" + val + "/advokat/" + this.data.id , {
      headers: headers
    })
    .subscribe(data => {
      console.log(data.json());
      if (data.json().cek.pembayaran == null) {
        this.status = 1
      } else { 
      
        if (data.json().cek.pembayaran.status == "") {
          this.status = 1
        }
       
        if (data.json().cek.pembayaran.status == null) {
          this.status = 1
        }
        
                if (data.json().cek.pembayaran.status == 'pending') {
                  this.status = 2
                }

        if (data.json().cek.pembayaran.status == "settlement") {
          this.status = 3
        }

        if (data.json().cek.pembayaran.status == 'failed') {
          this.status = 4
        }
      }
     
      }, error => {
        console.log(error.json());
        
      });
    });
    };


  


  ngOnInit() {
  }

  gotoPay(){
    this.sendData.setData(this.data);
    this.navCtrl.navigateForward('/payment-detail')
  }

  gotoChat() {
    this.navCtrl.navigateForward('/payment-detail')
  }

}