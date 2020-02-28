import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  LoadingController,
  NavController,
  AlertController
} from '@ionic/angular';
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-daftar',
  templateUrl: './daftar.page.html',
  styleUrls: ['./daftar.page.scss'],
})
export class DaftarPage implements OnInit {

  nama: AbstractControl;
  username: AbstractControl;
  no_telp: AbstractControl;
  email: AbstractControl;
  registerForm: FormGroup;
  password: AbstractControl;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  checkbox: any;
  constructor(
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    private http: Http) {

      this.registerForm = this.formBuilder.group({
        nama: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])),
      });
  
      this.nama = this.registerForm.controls['nama'];
      this.email = this.registerForm.controls['email'];
      this.password = this.registerForm.controls['password'];
    }

    hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    syarat(){      
      this.navCtrl.navigateForward('/syarat')
  }

  addValue(e) {
    this.checkbox = e
    console.log(e.currentTarget.checked);
    console.log(e.detail)
    console.log(e.detail.checked);
  }

 async  checkboxStatus(){
   console.log(this.checkbox)
  
  if (this.checkbox) {
    
    if (this.checkbox.detail.checked == true) {
      this.daftar()
    } else {        
      const alert = await this.alertCtrl.create({
        header: 'Gagal Mendaftar',
        message: 'Anda belum menyetujui Syarat & Ketentuan kami.',
        buttons: ['OK']
      });
      
      await alert.present()
    }

  } else {
       const alert = await this.alertCtrl.create({
        header: 'Gagal Mendaftar',
        message: 'Anda belum menyetujui Syarat & Ketentuan kami.',
        buttons: ['OK']
      });
      
      await alert.present()
  }
   
  }

 

  async daftar() {

    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const requestOptions = new RequestOptions({
      headers: headers
    });

    this.http.post("http://konsultasihukum.livingpay.id/api/register", this.registerForm.value, requestOptions)
      .subscribe( 
        async data => {
        console.log(data.json());
        if (data.json().email.email == null) {
          const alert = await this.alertCtrl.create({
            header: 'Gagal Mendaftar',
          message: 'Data belum lengkap.',
          buttons: ['OK']
        });
        
        await alert.present();
        } else {
          
          if (data.json().message_error = 'Email Telah digunakan.') {
            const alert = await this.alertCtrl.create({
              header: 'Gagal Mendaftar',
            message: data.json().message_error,
            buttons: ['OK']
          });
          
          await alert.present();
        } 
      }
        this.loadingCtrl.dismiss().then(a => console.log('Selesai'));
      }, async error => {
        console.log(error.json());
        if (error.json().exception = "Illuminate\Database\QueryException") {
          const alert = await this.alertCtrl.create({
            header: 'Gagal Mendaftar',
            message: 'Data belum lengkap.',
            buttons: ['OK']
          });
      
          await alert.present();
        } 
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
  };
  

    ngOnInit() {}

}