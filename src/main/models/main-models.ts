export interface ToolbarHeader {
  header: string;
}
export interface ToolbarActions {
  actions: string[];
}
export interface ToolbarOutput {
  action: string;
}
export class ToolbarInput implements ToolbarHeader, ToolbarActions {
  public header: string;
  public selected = '';
  public actions: string[];
  constructor() {
    this.header = '';
    this.actions = [];
  }
}
