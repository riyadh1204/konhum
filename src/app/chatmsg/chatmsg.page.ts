import { Component, OnInit,ViewChild  } from '@angular/core';
import { IonContent, NavController, AlertController } from '@ionic/angular';
import { SendDataService } from '../send-data.service';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-chatmsg',
  templateUrl: './chatmsg.page.html',
  styleUrls: ['./chatmsg.page.scss'],
})
export class ChatmsgPage implements OnInit {
  dataChat:any;
  newMsg = '';
  id:any;
  data = this.sendData.getData();
  messages :any;
  currentUser = this.data.user.id;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  constructor(public storage:Storage, public alertCtrl:AlertController,public navCtrl:NavController,public http:Http,public sendData: SendDataService,) {
    this.getData()
    console.log(this.data);
   
   }

   ionViewWillEnter(){
     

    console.log(this.data)
    this.id = setInterval( () => {
    this.getData2();
    }, 6000);

   }

   ionViewWillLeave(){
    clearInterval(this.id);
   }

   getData() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const requestOptions = new RequestOptions({
      headers: headers
    });
    
    this.http.get('http://konsultasihukum.livingpay.id/api/chat/'+ this.data.user.id + '/advokat/' + this.data.advokat_id )
    .subscribe(data => {
      this.messages = data.json().chat
      console.log(this.messages);
      setTimeout(() => {
        this.content.scrollToBottom(200);
      });
  
    }, error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah anda sudah selesai konsultasi ?',
      buttons: [
        {
          text: 'Tidak',
          handler: (blah) => {
           
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.endChat();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  endChat(){

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);


    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const requestOptions = new RequestOptions({
      headers: headers
    });
    
    const body = {
      user_id:this.currentUser,
      advokat_id:this.data.advokat.id
    }
    this.http.post('http://konsultasihukum.livingpay.id/api/endchat',body )
    .subscribe(data => {
     
      console.log(data.json());
      this.sendData.setData(this.data);
      this.navCtrl.navigateRoot('/rating')
      clearInterval(this.id);
    }, error => {
  
      console.log(error);
  
    });
  });
  }

  getData2() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const requestOptions = new RequestOptions({
      headers: headers
    });
    
    this.http.get('http://konsultasihukum.livingpay.id/api/chat/'+ this.data.user.id + '/advokat/' + this.data.advokat_id )
    .subscribe(data => {
      this.messages = data.json().chat
      console.log(data.json());
    
  
    }, error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }

  postData() {
    const pesanBaru = this.newMsg;   
    this.messages.push({
      user: this.data.user.nama,
      created_at: new Date().getTime(),
      message: pesanBaru,
      user_id:this.data.user.id,
    });
    this.newMsg = '';
 
    
 
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
   
   

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const requestOptions = new RequestOptions({
      headers: headers
    });
    const body = {
      chat_session_id:this.data.id,
      user_id:this.data.user.id,
      message: pesanBaru
    }
    this.http.post('http://konsultasihukum.livingpay.id/api/store/message',body )
    .subscribe(data => {
      
      console.log(data.json());
      this.getData()
  
    }, error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }

  //  sendMessage() {
  //   this.messages.push({
  //     user: this.data.user.nama,
  //     createdAt: new Date().getTime(),
  //     msg: this.newMsg
  //   });
 
  //   this.newMsg = '';
 
  //   setTimeout(() => {
  //     this.content.scrollToBottom(200);
  //   });
  // }

  ngOnInit() {
  }

}
