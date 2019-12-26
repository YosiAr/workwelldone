import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainRoutingModule } from './main-routing-module';
import { MainToolBarComponent } from './main-home/main-tool-bar/main-tool-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [MainHomeComponent, MainToolBarComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule
  ]
})
export class MainModule { }
