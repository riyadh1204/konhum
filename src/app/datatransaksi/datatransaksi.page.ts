import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../send-data.service';

@Component({
  selector: 'app-datatransaksi',
  templateUrl: './datatransaksi.page.html',
  styleUrls: ['./datatransaksi.page.scss'],
})
export class DatatransaksiPage implements OnInit {
  data:any;
  constructor(public sendData:SendDataService) { 
    this.data = this.sendData.getData();
    console.log(this.data)
  }

  ngOnInit() {
  }

}
