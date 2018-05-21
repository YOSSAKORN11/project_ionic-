import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FramDetailPage } from './fram-detail';

@NgModule({
  declarations: [
    FramDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FramDetailPage),
  ],
})
export class FramDetailPageModule {}
