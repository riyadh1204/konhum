import { Component, OnInit } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SendDataService } from '../send-data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  ratingBintang:any;
  data = this.sendData.getData();
  constructor(public navCtrl:NavController,public http:Http,public storage:Storage,public sendData:SendDataService) { }

  ngOnInit() {
  }

  async Check(){

    this.storage.get('user_id').then((val) => {
    console.log('user_id :', val);
        
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const body = {
      user_id :val, 
      advokat_id:this.data.advokat_id, 
      rating:this.ratingBintang
    } 

    this.http.post("http://konsultasihukum.livingpay.id/api/rating" , body,{
      headers: headers
    })
    .subscribe(data => {
      console.log(data.json());
      this.navCtrl.navigateRoot('/')
      
      }, error => {
        console.log(error.json());
        
      });
    });
    };

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
    if (rating == 1) {
      this.ratingBintang = 20
    }
    if (rating == 2) {
      this.ratingBintang = 40
    }
    if (rating == 3) {
      this.ratingBintang = 60
    }
    if (rating == 4) {
      this.ratingBintang = 80
    }
    if (rating == 5) {
      this.ratingBintang = 100
    }
    console.log("changed rating uhuy: ",this.ratingBintang);
}

kirim(){
  this.Check()
}

}
