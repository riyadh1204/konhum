import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StarRating } from 'ionic4-star-rating';

import { RatingPageRoutingModule } from './rating-routing.module';

import { RatingPage } from './rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingPageRoutingModule
  ],
  declarations: [RatingPage,StarRating],
  exports: [ StarRating ]
})
export class RatingPageModule {}
