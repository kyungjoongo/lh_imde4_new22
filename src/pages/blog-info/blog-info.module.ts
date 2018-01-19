import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogInfoPage } from './blog-info';

@NgModule({
  declarations: [
    BlogInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogInfoPage),
  ],
})
export class BlogInfoPageModule {}
