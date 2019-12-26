import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing-module';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesCreateComponent } from './categories-home/categories-create/categories-create.component';
import { CategoriesViewComponent } from './categories-home/categories-view/categories-view.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [CategoriesHomeComponent, CategoriesCreateComponent, CategoriesViewComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ]
})
export class CategoriesModule { }
