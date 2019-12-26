import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToolbarInput, ToolbarOutput } from '../../models/main-models';

@Component({
  selector: 'app-main-tool-bar',
  templateUrl: './main-tool-bar.component.html',
  styleUrls: ['./main-tool-bar.component.scss']
})
export class MainToolBarComponent {
  @Input() input: ToolbarInput;
  @Output() event: EventEmitter<ToolbarOutput> = new EventEmitter();
  actionClick(action) {
    this.input.selected = action;
    this.event.emit(action);
  }
}
