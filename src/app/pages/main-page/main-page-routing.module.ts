import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./../home/home.module')
  //       .then((m) => m.HomeModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
