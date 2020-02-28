import {
  Component,
  OnInit
} from '@angular/core';
import {
  Http,
  RequestOptions,
  Headers
} from '@angular/http';
import {
  Events,
  NavController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';
import {
  GooglePlus
} from '@ionic-native/google-plus/ngx';
import {
  Facebook,
  FacebookLoginResponse
} from '@ionic-native/facebook/ngx';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  userStatus: any;
  user: any = {};
  userData: any;
  email: AbstractControl;
  password: AbstractControl;
  registerForm: FormGroup;
  data: any;
  status: any;
  statusDaftar: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(public alertController: AlertController, public formBuilder: FormBuilder, private fb: Facebook, private loadingCtrl: LoadingController, private navCtrl: NavController, private storage: Storage, private googlePlus: GooglePlus, private http: Http, private events: Events) {
    
    this.registerForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])),
      }),

      this.email = this.registerForm.controls['email'];
    this.password = this.registerForm.controls['password'];

  }

  ngOnInit() {}

pengaturan(){
  this.navCtrl.navigateForward('/pengaturan')
}

 

  async presentAlertErr(msg) {
    const alert = await this.alertController.create({
      header:'Gagal',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async login() {

    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");


    this.http.post("http://konsultasihukum.livingpay.id/api/login", this.registerForm.value, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
    if (data.json().email.role == 'advokat') {
      this.presentAlertErr('Password dan email salah');
      this.loadingCtrl.dismiss();

    } else {

      if (data.json().email.alamat == null) {
        this.storage.set('datadiri', data.json().email)
        this.storage.set('login', 'normal')
        this.storage.set('token', data.json().token).then(a => console.log('token'));
        this.storage.set('user_id', data.json().email.id);
        this.navCtrl.navigateRoot("/datadiri");    
        this.loadingCtrl.dismiss();
      } else {
        this.storage.set('datadiri', data.json().email)
        this.storage.set('login', 'normal')
        this.storage.set('token', data.json().token).then(a => console.log('token'));
        this.storage.set('user_id', data.json().email.id);
        this.navCtrl.navigateRoot("/home/tabs/home");    
        this.loadingCtrl.dismiss();
      }
    }
        
        
      }, error => {
       if (error.json().type == 'error') {
        this.presentAlertErr('Koneksi tidak terhubung');
       } else {         
         this.presentAlertErr(error.json().message);
       }

        console.log(error.json());
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
  };

  daftar() {
    this.navCtrl.navigateForward('/daftar')
  }

logoutGoogle(){
  this.googlePlus.logout()
  console.log('Google logout success');
  this.navCtrl.navigateRoot('/home/tabs/home');
  this.storage.remove('userData').then(a => console.log('Hapus User Data2'));
  this.storage.remove('userData2').then(a => console.log('Hapus User Data'));
  this.storage.remove('token').then(a => console.log('Hapus Token'));
  this.storage.remove('user').then(a => console.log('Hapus User'));
  this.data = null
}
  

  async loginGoogle() {
    this.storage.set('login', 'google')
    this.googlePlus.login({})
      .then(res => {
        this.checkUserGoogle(res);
        console.log(res)
        this.user = res;
        this.getData();
      }), err => {
        console.error(err)
        this.googlePlus.logout()
      };
  }

  async checkUserFacebook(res) {
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const body = {
      nama: res.nama,
      username: res.email
    }

    this.http.post("http://konsultasihukum.livingpay.id/api/login/social-media", body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json());
        if (data.json().email.alamat == null) {
          this.storage.set('datadiri', data.json().email)
          this.storage.set('login', 'facebook')
          this.storage.set('token', data.json().token).then(a => console.log('token'));
          this.storage.set('user_id', data.json().email.id);
          this.navCtrl.navigateRoot("/datadiri");    
          this.loadingCtrl.dismiss();
        } else {
          this.storage.set('datadiri', data.json().email)
          this.storage.set('login', 'facebook')
          this.storage.set('token', data.json().token).then(a => console.log('token'));
          this.storage.set('user_id', data.json().email.id);
          this.navCtrl.navigateRoot("/home/tabs/home");    
          this.loadingCtrl.dismiss();
        }
       
      
      }, error => {
          this.daftarUserFacebook(res)
       
        console.log(error.json());
      });
  }

  async daftarUserFacebook(res) {
   
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const body = {
      nama: res.nama,
      email: res.email,
      status: 'facebook'
    }

    this.http.post("http://konsultasihukum.livingpay.id/api/register/social-media", body, {
        headers: headers
      })
      .subscribe(data => {
        this.logIn();
        console.log(data.json(),'daftar user fb');
        if (data.json().cekEmail.alamat == null) {
          this.storage.set('datadiri', data.json().email)
          this.storage.set('login', 'facebook')
          this.storage.set('token', data.json().token).then(a => console.log('token'));
          this.storage.set('user_id', data.json().email.id);
          this.navCtrl.navigateRoot("/datadiri");    
          this.loadingCtrl.dismiss();
        } else {
          this.storage.set('datadiri', data.json().email)
          this.storage.set('login', 'facebook')
          this.storage.set('token', data.json().token).then(a => console.log('token'));
          this.storage.set('user_id', data.json().email.id);
          this.navCtrl.navigateRoot("/home/tabs/home");    
          this.loadingCtrl.dismiss();
        }
        
      }, error => {
        console.log(error.json());
        this.presentAlertErr(error.json().message);
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
  }

  async checkUserGoogle(res) {
    const loading = await this.loadingCtrl.create({
      message: 'Mohon Tunggu..',
    });
    await loading.present();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const body = {
      nama: res.displayName,
      username: res.email
    }

    this.http.post("http://konsultasihukum.livingpay.id/api/login/social-media", body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json(),'data check user google');
        if (data.json().email.alamat == null) {
          this.storage.set('datadiri', data.json().email)
          this.storage.set('login', 'google')
          this.storage.set('token', data.json().token).then(a => console.log('token'));
          this.storage.set('user_id', data.json().email.id);
          this.navCtrl.navigateRoot("/datadiri");    
          this.loadingCtrl.dismiss();
        } else {
          this.storage.set('datadiri', data.json().email)
          this.storage.set('login', 'google')
          this.storage.set('token', data.json().token).then(a => console.log('token'));
          this.storage.set('user_id', data.json().email.id);
          this.navCtrl.navigateRoot("/home/tabs/home");    
          this.loadingCtrl.dismiss();
        }
        
       
     
      }, error => {
          this.daftarUserGoogle(res)
        console.log(error.json());
      });
  }

  async daftarUserGoogle(res) {
 
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const body = {
      nama: res.displayName,
      email: res.email,
      status: 'google'
    }

    this.http.post("http://konsultasihukum.livingpay.id/api/register/social-media", body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data.json(),'uy')

        if (data.json().email.alamat == null) {
          this.storage.set('datadiri', data.json().email)
          this.logIn();
          this.storage.set('token', data.json().token)
          this.storage.set('login', 'google')
          this.storage.set('user_id', data.json().user.id);
          this.navCtrl.navigateRoot("/datadiri");    
          this.loadingCtrl.dismiss();
        } else {
          this.storage.set('datadiri', data.json().email)
          this.logIn();
          this.storage.set('token', data.json().token)
          this.storage.set('login', 'google')
          this.storage.set('user_id', data.json().user.id);
          this.navCtrl.navigateRoot("/home/tabs/home");    
          this.loadingCtrl.dismiss();
        }
      
      }, error => {
        console.log(error.json());
        this.presentAlertErr(error.json().message);
        this.loadingCtrl.dismiss().then(a => console.log('Error'));
      });
  }

  async loginFacebook() {
    this.storage.set('login', 'facebook')
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      console.log("response :", response.authResponse.accessToken);
      this.storage.set('token', response.authResponse.accessToken);
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        console.log(profile)
       

        if (profile['email']) {

          this.userData = {
            email: profile['email'],
            first_name: profile['first_name'],
            picture: profile['picture_large']['data']['url'],
            nama: profile['name'],
            status: 'facebook'
          };

        } else {
          
          this.userData = {
            email: profile['id'],
            first_name: profile['first_name'],
            picture: profile['picture_large']['data']['url'],
            nama: profile['name'],
            status: 'facebook'
          };
        }
      

        
        console.log(  this.userData)
        this.checkUserFacebook(  this.userData);
      })
    })
  }

  lupa() {
    this.navCtrl.navigateForward('/lupa')
  }

  logIn() {
    this.events.publish('user:login');
  }

  getData() {
    let token = this.user.accessToken;

    this.http.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + token)
      .subscribe((data: any) => {
        console.log(data.json())
        this.storage.set('userData', data.json());
        this.user.name = data.json().displayName;
        this.user.image = data.json().image.url;
        console.log(this.user.image);
      })
  }
}