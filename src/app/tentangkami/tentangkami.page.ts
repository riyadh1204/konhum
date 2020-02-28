import { Component, OnInit } from '@angular/core';

import { Http,Headers } from '@angular/http';

@Component({
  selector: 'app-tentangkami',
  templateUrl: './tentangkami.page.html',
  styleUrls: ['./tentangkami.page.scss'],
})
export class TentangkamiPage implements OnInit {
  data:any
  
  constructor(public http:Http) { 
    this.getData() 
  }

  ngOnInit() {
  }

  async getData(){

  
      
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
    
  this.http.get("http://konsultasihukum.livingpay.id/api/tentang-kami" , {
    headers: headers
  })
  .subscribe(data => {
    console.log(data.json());
    this.data = data.json();
    
    }, error => {
      console.log(error.json());
    });
  };

}
