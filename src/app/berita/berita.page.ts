import { Component, OnInit,ViewChild } from '@angular/core';
import { SendDataService } from '../send-data.service';
import { LoadingController, Events, ToastController, AlertController } from '@ionic/angular';
import { Http ,Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-berita',
  templateUrl: './berita.page.html',
  styleUrls: ['./berita.page.scss'],
})


export class BeritaPage implements OnInit {

  data:any;
  suka:any;
  likes:any;
  isi:any;
  dataKomen:any;
  gambar:any;
  load:any;
  loadDel:any;
  nama:any;
  disabled:any;

  @ViewChild(IonContent , {static: false}) content: IonContent;
  constructor(public alertCtrl:AlertController,public events:Events,public toastController: ToastController,public sendData:SendDataService,public loadingCtrl:LoadingController,public http:Http,public storage:Storage) { 
    this.getData()
    this.suka = false;
    this.loadDel = false;
    this.data = this.sendData.getData();
    console.log(this.data) 
    this.likes = this.data.likes_count;
    this.cekLike();
    this.getKomen();
  }
  ionViewDidLeave(){
    console.log('User created!')
    this.events.publish('berita:change');
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
      this.gambar = data.json().user.foto;
      this.nama = data.json().user.nama;
      }, error => {
        console.log(error.json());
      
      });
    });
    };

  async cekLike(){
   
    this.load = true;
    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
          
     
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.get("http://konsultasihukum.livingpay.id/api/like/" + val + "/artikel/" + this.data.id , {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        if (data.json().cekLike != null) {
          this.suka = true;
        } else {
          this.suka = false;
        }
        this.load = false;
        }, error => {
          console.log(error.json());
        });
      });
  }

  async likePost(){
   

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
          
      const body = { 
        user_id : val,
        artikel_id :this.data.id
      }
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.post("http://konsultasihukum.livingpay.id/api/like" ,body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.suka = true;
        this.load = false;
        this.likes = this.likes 
        }, error => {
          console.log(error.json());
         
        });
      });
  }

  async unlikePost(){
  

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
          
      const body = { 
        user_id : val,
        artikel_id :this.data.id
      } 
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.post("http://konsultasihukum.livingpay.id/api/unlike" ,body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.suka = false;
        this.load = false;
        this.likes = this.likes 
        }, error => {
          console.log(error.json());
        
        });
      });
  }

  async komenPost(){
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
      console.log('isi :', this.isi);
      const body = { 
        user_id : val,
        artikel_id :this.data.id,
        isi:this.isi
      } 
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.post("http://konsultasihukum.livingpay.id/api/komen" ,body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.getKomen();
        this.isi = null
        this.presentToast('Komentar anda berhasil terkirim');
        this.loadingCtrl.dismiss()
        }, error => {
          console.log(error.json());
          this.loadingCtrl.dismiss()
        });
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async getKomen(){

      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.get("http://konsultasihukum.livingpay.id/api/komen/" + this.data.id , {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.dataKomen = data.json();
        setTimeout(() => {
          this.content.scrollToBottom(200);
        });
        }, error => {
          console.log(error.json());
         
        });
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin menghapus komentar ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Iya',
          handler: () => {
            this.disabled = true;
            this.loadDel = true;
            this.delKomenPost(item)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  async delKomenPost(item){
  

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
          
      const body = { 
        id : item.id,
        artikel_id :this.data.id
      } 
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.post("http://konsultasihukum.livingpay.id/api/unkomen" ,body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.getKomen();
        this.presentToast('Komentar anda dihapus.');
        this.loadDel = false;
        this.disabled = false;
        }, error => {
          console.log(error.json());
          
        });
      });
  }

  like(){
    this.suka = null; 
    this.load = true;
    this.likePost()
    
  }

  unlike(){
    this.suka = null; 
    this.load = true;
    this.unlikePost();
    
  }

}
