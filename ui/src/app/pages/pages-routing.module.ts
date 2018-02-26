import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { AboutComponent } from './public/about/about.component';
import { BlogComponent } from './public/blog/blog.component';
import { HomeComponent } from './public/home/home.component';
import { CustomPageComponent } from './public/custom-page/custom-page.component';
import { PressComponent } from './public/press/press.component';
import { TestimonialsComponent } from './public/testimonials/testimonials.component';
import { VideosComponent } from './public/videos/videos.component';
import { ClientSettingsComponent } from './private/client-settings/client-settings.component';
import { ClientSearchesComponent } from './private/client-searches/client-searches.component';
import { ClientListingsComponent } from './private/client-listings/client-listings.component';

import { AuthGuard } from './private/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'pages/:page-id', component: CustomPageComponent },
  { path: 'press', component: PressComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'my-settings', component: ClientSettingsComponent, canActivate: [ AuthGuard ] },
  { path: 'my-searches', component: ClientSearchesComponent, canActivate: [ AuthGuard ] },
  { path: 'my-listings', component: ClientListingsComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
