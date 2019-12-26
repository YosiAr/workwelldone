import { Injectable } from '@angular/core';
import { ToolbarInput } from 'src/main/models/main-models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public navClick: Subject<any> = new Subject();
  protected toolbar: ToolbarInput = new ToolbarInput();
  private categoryActions = {};
  constructor() {
    this.toolbar.header = 'Home';
    this.toolbar.actions = ['new category', 'view details', 'edit'];
  }
  actionEvent(e) {
    this.navClick.next(e);
  }
  setActions(num: number) {
    this.toolbar.actions = JSON.parse(JSON.stringify(this.categoryActions[num]));
  }
  setCategoryActions(actions) {
    this.categoryActions = JSON.parse(JSON.stringify(actions))
  }
  setHeader(header: string) {
    this.toolbar.header = header;
  }
  setSelected(selected: string) {
    this.toolbar.selected = selected;
  }
}
