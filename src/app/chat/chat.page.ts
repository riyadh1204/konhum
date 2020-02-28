
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';
import { LoadingController, NavController,Events } from '@ionic/angular';
import { SendDataService } from '../send-data.service';
import { Body } from '@angular/http/src/body';
import { last } from 'rxjs/operators';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // lat1:any;
  // lat2:any;
  // lon1:any;
  // lon2:any;
  data:any;
  lastMsg:any;
  dataChat:any;
  id:any;
  constructor(
    public events:Events,
    public sendData: SendDataService,
    public storage:Storage,
    public http:Http,public loadingCtrl:LoadingController,public navCtrl:NavController) {
      this.getData()
//  this.lat1 = -0.502106;
//    this.lon1 = 117.153709;
//    this.lat2 = -1.269160;
//    this.lon2 = 116.825264;
//    this.getDistanceFromLatLonInKm()

   }

   ionViewWillEnter(){
  
    this.id = setInterval( () => {
    this.getData();
    }, 6000);

   }

   ionViewWillLeave(){
    clearInterval(this.id);
   }

   ionViewDidLeave(){
    clearInterval(this.id);
   }

   livechat(){
    this.navCtrl.navigateForward('/livechat')
   }

   chatmsg(item){
    this.sendData.setData(item);
     this.navCtrl.navigateForward('/chatmsg')
   }

   endChat(){
  
      this.navCtrl.navigateRoot('/rating')
  
 
  }

   async getData(){
   
    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
 
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.get("http://konsultasihukum.livingpay.id/api/chat/" + val, {
        headers: headers
      })
      .subscribe(data => {
        this.dataChat = data.json().chat;
        console.log(data.json());
        if (this.dataChat.length != 0) {
          this.lastMsg = this.dataChat[0].chat_sessions[0].chat_messages.pop();
          console.log(this.lastMsg);
        }
        }, error => {
          console.log(error);
          
        });
      });
    }

    

  ngOnInit() {
  }

  //  getDistanceFromLatLonInKm() {
  //   console.log('wakwaw')
    
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = this.deg2rad(this.lat2-this.lat1);  // deg2rad below
  //   var dLon = this.deg2rad(this.lon2-this.lon1); 
  //   var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(this.lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  //   var d = R * c; // Distance in km
  //   console.log(d)
    
 
  //   }

  //    deg2rad(deg) {
  //     return deg * (Math.PI/180)
  //   }

  }

