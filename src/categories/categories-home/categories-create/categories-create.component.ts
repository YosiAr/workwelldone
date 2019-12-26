import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesStorageService } from 'src/shared/services/categories-storage.service';
import { EventC } from 'src/categories/models/category-models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnDestroy, AfterViewInit {
  private sub: Subscription;
  private sub2: Subscription;
  private input: FormControl = new FormControl('');
  protected action = '';
  protected type = '';
  protected color = 'primary';
  protected active = true;
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public css: CategoriesStorageService
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.type = this.route.snapshot.data.type;
      if (this.type == 'edit') {
        this.action = params.value;
        if (!this.css.checkCategoryName(this.action)) {
          this.router.navigate(['../main/categories']);
        }
        this.input.setValue(this.action);
      }
    });
    this.sub2 = this.css.storageEmitter.subscribe( (data: EventC) => {
      if (data.type == 'delete' && data.value.name == this.action ) {
        this.router.navigate(['../main/categories']);
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  checkInput(input: string) {
    // this.input = input;
    this.active = this.css.checkCategoryName(input);
  }
  save() {
    if (this.type == 'new') {
      this.css.addCategory(this.input.value);
    }
    if (this.type == 'edit') {
      this.css.editCategory(this.action, this.input.value);
    }
  }
  ngAfterViewInit(): void {
    document.getElementsByTagName('input')[0].focus();
  }
}
