import { Component } from '@angular/core';
import { MainService } from 'src/shared/services/main.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent {

  constructor(public ms: MainService) {
  }
}
