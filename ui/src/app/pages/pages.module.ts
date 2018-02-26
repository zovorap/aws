import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { VideosComponent } from './public/videos/videos.component';
import { TestimonialsComponent } from './public/testimonials/testimonials.component';
import { PressComponent } from './public/press/press.component';
import { BlogComponent } from './public/blog/blog.component';
import { CustomPageComponent } from './public/custom-page/custom-page.component';
import { ClientSettingsComponent } from './private/client-settings/client-settings.component';
import { AuthGuard } from './private/auth-guard.service';
import { ClientSearchesComponent } from './private/client-searches/client-searches.component';
import { ClientListingsComponent } from './private/client-listings/client-listings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    AboutComponent,
    VideosComponent,
    TestimonialsComponent,
    PressComponent,
    BlogComponent,
    CustomPageComponent,
    ClientSettingsComponent,
    ClientSearchesComponent,
    ClientListingsComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class PagesModule { }
