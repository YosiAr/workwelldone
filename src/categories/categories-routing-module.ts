import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesCreateComponent } from './categories-home/categories-create/categories-create.component';
import { CategoriesViewComponent } from './categories-home/categories-view/categories-view.component';
const routes: Routes = [
  { path: '', component: CategoriesHomeComponent, children: [
      // {
      //   path: '', redirectTo: 'new', pathMatch: 'full'
      // },
      {
        path: 'new', component: CategoriesCreateComponent, data: {type: 'new'}
      },
      {
        path: 'edit/:value', component: CategoriesCreateComponent, data: {type: 'edit'}
      },
      {
        path: 'details/:value', component: CategoriesViewComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
