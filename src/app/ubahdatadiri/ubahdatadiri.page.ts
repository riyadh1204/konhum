import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';


import { LoadingController, Events } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, AlertController } from '@ionic/angular';
import { Http ,Headers} from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';


import { Crop } from '@ionic-native/crop/ngx';


@Component({
  selector: 'app-ubahdatadiri',
  templateUrl: './ubahdatadiri.page.html',
  styleUrls: ['./ubahdatadiri.page.scss'],
})
export class UbahdatadiriPage implements OnInit {
  nama: AbstractControl;
  jenis_kelamin: AbstractControl;
  no_telepon: AbstractControl;
  tanggal_lahir: AbstractControl;
  alamat: AbstractControl;
  registerForm: FormGroup;
  ubahStatus:any;
  data:any;
  gambar:any;
  constructor(
    private crop: Crop,
    private transfer: FileTransfer,
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
    });
    this.nama = this.registerForm.controls['nama'];
    this.jenis_kelamin = this.registerForm.controls['jenis_kelamin'];
    this.no_telepon = this.registerForm.controls['no_telepon'];
    this.tanggal_lahir = this.registerForm.controls['tanggal_lahir'];
    this.alamat = this.registerForm.controls['alamat'];
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
    })
    }, error => {
      console.log(error.json());
    });
  });
  };

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
    this.ubahStatus = false;
  }

}
