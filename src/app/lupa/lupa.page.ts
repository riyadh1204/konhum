import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { Http,Headers } from '@angular/http';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
@Component({
  selector: 'app-lupa',
  templateUrl: './lupa.page.html',
  styleUrls: ['./lupa.page.scss'],
})
export class LupaPage implements OnInit {

  email: AbstractControl;
  registerForm: FormGroup;

  constructor(
    public alertCtrl:AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl:LoadingController,
    public http:Http, 
    public navCtrl:NavController) {

      this.registerForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required
        ])),
      }),
  
    this.email = this.registerForm.controls['email'];

     }

  ngOnInit() {
  }
  
  async doLupa() {

    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");


    this.http.post("http://konsultasihukum.livingpay.id/api/forget-password", this.registerForm.value, {
        headers: headers
      })
      .subscribe(
        async data => {
        console.log(data.json());
        this.navCtrl.navigateRoot("/");
        const alert = await this.alertCtrl.create({
          header:'Berhasil',
          message: data.json().message,
          buttons: ['OK']
        });
    
        await alert.present();
        this.loadingCtrl.dismiss().then(a => console.log('Selesai'));
      }, async error => {
        const alert = await this.alertCtrl.create({
          header:'Gagal',
          message: 'Email tidak terdaftar.',
          buttons: ['OK']
        });
    
        await alert.present();
        console.log(error.json());
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
  };
}
