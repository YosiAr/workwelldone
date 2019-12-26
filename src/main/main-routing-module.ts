import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
const routes: Routes = [
  {
    path: '', component: MainHomeComponent, children: [
      {
        path: '', redirectTo: 'categories', pathMatch: 'full'
      },
      {
        path: 'categories',
        loadChildren: '../categories/categories.module#CategoriesModule'
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
