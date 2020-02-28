import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-kontakkami',
  templateUrl: './kontakkami.page.html',
  styleUrls: ['./kontakkami.page.scss'],
})
export class KontakkamiPage implements OnInit {
  kontak:any;
  constructor(private clipboard: Clipboard, private callNumber:CallNumber) { 
    this.kontak =[
      {id:'1',socmed:'fb',alamat:'Konsultasi Hukum ID',foto:'https://image.flaticon.com/icons/svg/124/124010.svg'},
      {id:'2',socmed:'ig',alamat:'@konsultasihukum',foto:'https://image.flaticon.com/icons/svg/174/174855.svg'},
      {id:'3',socmed:'twt',alamat:'@KonsultasiHukum',foto:'https://image.flaticon.com/icons/svg/124/124021.svg'},
      {id:'4',socmed:'wa',alamat:'0812345678',foto:'https://image.flaticon.com/icons/svg/220/220236.svg'},
  ]
  }

  copyTel(){
    this.callNumber.callNumber("082120480404", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  copyWeb(){
    this.clipboard.copy('Konsulhukum.id');
  }

  ngOnInit() {
  }

}
