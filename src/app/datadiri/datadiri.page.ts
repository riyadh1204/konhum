import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';


import { LoadingController, Events, NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, AlertController } from '@ionic/angular';
import { Http ,Headers} from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';


import { Crop } from '@ionic-native/crop/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datadiri',
  templateUrl: './datadiri.page.html',
  styleUrls: ['./datadiri.page.scss'],
})
export class DatadiriPage implements OnInit {
  nama: AbstractControl;
  jenis_kelamin: AbstractControl;
  no_telepon: AbstractControl;
  tanggal_lahir: AbstractControl;
  alamat: AbstractControl;
  email:AbstractControl;
  registerForm: FormGroup;
  ubahStatus:any;
  login:any;
  validEmail: any;
  data:any;
  gambar:any;
  constructor(
    public googlePlus:GooglePlus,
    public fb:Facebook,
    public router:Router,
    private crop: Crop,
    private alertCtrl:AlertController,
    private transfer: FileTransfer,
    private platform:Platform,
    public navCtrl:NavController,
    private camera: Camera,  
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    public events:Events,public formBuilder: FormBuilder,public storage:Storage,public http:Http,public loadingCtrl:LoadingController) 
    
    { 
      this.ubahStatus = false;
    this.getData()
    this.registerForm = this.formBuilder.group({
      nama: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])),
      jenis_kelamin: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])),
      no_telepon: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])),
      tanggal_lahir: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])),
      alamat: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])),
      email: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    });
    this.nama = this.registerForm.controls['nama'];
    this.email = this.registerForm.controls['email'];
    this.jenis_kelamin = this.registerForm.controls['jenis_kelamin'];
    this.no_telepon = this.registerForm.controls['no_telepon'];
    this.tanggal_lahir = this.registerForm.controls['tanggal_lahir'];
    this.alamat = this.registerForm.controls['alamat'];
    this.storage.get('login').then((val) => {
      this.login = val
      console.log('login :', this.login);
    })
  }
  
   
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

    async selectImage() {
        
        const actionSheet = await this.actionSheetController.create({
          header: "Pilih Sumber Foto",
          buttons: [{
            text: 'Pilih Dari Galeri',
            handler: () => {this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);}
          },
          {
            text: 'Gunakan Kamera',
            handler: () => {
            this.takePhoto();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await actionSheet.present();
    }
  

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    
      this.camera.getPicture(options).then((imageData) => {
        this.uploadImage(imageData)
      })
   
  }

  check(){
    if (this.gambar != 'http://konsultasihukum.livingpay.id/../../../app-assets/images/portrait/avatar-user.png') {
    if (!this.nama.hasError('required')) {
      if (!this.no_telepon.hasError('required')) {
        if (! this.jenis_kelamin.hasError('required')) {
          if (!this.tanggal_lahir.hasError('required')) {
            if (!this.alamat.hasError('required')) {
              if (!this.email.hasError('required')) {
                if (!this.email.hasError('pattern')) {
                  this.edit()
                } else {
                  this.alertErr('Email Tidak Valid')
                }
              } else {
                this.alertErr('Email Dibutuhkan')
              }
            } else {
              this.alertErr('Alamat Dibutuhkan')
            }
          } else {
            this.alertErr('Tanggal Lahir Dibutuhkan')
          }
        } else {
          this.alertErr('Jenis Kelamin Dibutuhkan')
        }
      } else {
        this.alertErr('No Telpon Dibutuhkan')
      }
    } else {
      this.alertErr('Nama Lengkap Dibutuhkan')
    }
  } else {
    this.alertErr('Foto Profile Dibutuhkan')
  }
  }

  async alertErr(err) {
    const alert = await this.alertCtrl.create({
      header: 'Gagal',
      message:err,
      buttons: ['OK']
    });

    await alert.present();
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.crop.crop(imageData, {quality: 75}).then(
        newImage => this.uploadImage(newImage),
        error => console.error('Error cropping image', error)
      );
    }, (err) => {
      console.log(err);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah data yang anda berikan sudah benar ?',
      buttons: [
        {
          text: 'Tidak',
          handler: (blah) => {
           
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
          this.check()
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async uploadImage(image){
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
       fileKey: 'foto',
       chunkedMode: false,
       mimeType: 'multipart/form-data',
    }

    fileTransfer.upload(image, 'http://konsultasihukum.livingpay.id/api/profile/' + val + "/foto", options)
     .then((data) => {
      this.presentToast('Berhasil memilih foto')
       this.gambar = null
       this.getData().then(this.gambar = this.data.user.foto );
       this.loadingCtrl.dismiss().then(a => console.log('oops'));
     }, (err) => {
      this.presentToast('Gagal memilih foto')
       this.loadingCtrl.dismiss().then(a => console.log('oopsidusi'));
       console.log(err);
     })

    })
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
    this.data = data.json();
    this.gambar = this.data.user.foto
    this.registerForm.patchValue({
      nama: this.data.user.nama,
      jenis_kelamin: this.data.user.jenis_kelamin,
      no_telepon:this.data.user.no_telepon,
      tanggal_lahir:this.data.user.tanggal_lahir,
      alamat:this.data.user.alamat,
      email:this.data.user.email,
    })
    }, error => {
      console.log(error.json());
    });
  });
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
  }

  async konfirmasi() {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Anda yakin ingin keluar ?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.logout()
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
async logoutPost(){
  this.storage.get('user_id').then((val) => {
    console.log('user_id :', val);
 
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    this.http.post("http://konsultasihukum.livingpay.id/api/logout/" + val , {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.loadingCtrl.dismiss().then(a => console.log('Selesai'));
      }, error => {
        console.log(error.json());
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
    })
  }


  async logout(){
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu ..',
      duration: 2000
    });
    await loading.present();
   
  
    if(this.login == 'normal'){
      this.router.navigateByUrl('/login', { skipLocationChange: true });
      this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
      this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
      this.storage.remove('token').then(a => console.log('Hapus Token'));
      this.storage.remove('user').then(a => console.log('Hapus User'));
      this.data = null
      this.nama = null
      this.logoutPost()
     
    }
    
    if(this.login == 'google'){
      this.googlePlus.logout()
          console.log('Google logout success');
          this.router.navigateByUrl('/login', { skipLocationChange: true });
          this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
          this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
          this.storage.remove('token').then(a => console.log('Hapus Token'));
          this.storage.remove('user').then(a => console.log('Hapus User'));
          this.data = null
          this.nama = null
          this.logoutPost()
          
    }
    if (this.login == 'facebook') {
      this.navCtrl.navigateRoot('/login')
      this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
      this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
      this.storage.remove('token').then(a => console.log('Hapus Token'));
      this.storage.remove('user').then(a => console.log('Hapus User'));
      this.data = null
      this.nama = null
      this.fb.logout().then(a => console.log('logout fb'));
      this.logoutPost()

    }
     
  }

  async edit(){
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    this.storage.get('user_id').then((val) => {
      console.log('user_id :', val);
          
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
        
      this.http.post("http://konsultasihukum.livingpay.id/api/profile/" + val ,this.registerForm.value, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        this.storage.set('datadiri', data.json().user)
        this.presentToast('Berhasil menyimpan data diri')
        this.navCtrl.navigateRoot('/home/tabs/home');
        this.loadingCtrl.dismiss()
        }, error => {
          console.log(error.json());
          this.loadingCtrl.dismiss()
        });
      });
  }

  ionViewDidLeave(){
    console.log('User created!')
    this.events.publish('user:created');
  }
  
  ngOnInit() {
  }

  ubah(){
    this.ubahStatus = true;
  }

  simpan(){
    this.edit();
    
  }

}

