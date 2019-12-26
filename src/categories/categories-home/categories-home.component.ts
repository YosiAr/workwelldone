import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesStorageService } from 'src/shared/services/categories-storage.service';
import { Category, EventC } from '../models/category-models';
import { Subscription } from 'rxjs';
import { MainService } from 'src/shared/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnDestroy {
  protected categories: string[] = [];
  protected categoriesDisplay: string[] = [];
  private start = 0;
  private end = 7;
  protected categoriesMap: Map<string, number> = new Map();
  private sub: Subscription;
  private sub2: Subscription;
  private selected = '';
  constructor(
    public css: CategoriesStorageService,
    private router: Router,
    public ms: MainService
  ) {
    this.setCategoryActions();
    this.ms.setActions(2);
    this.ms.setHeader('Categories');
    this.sub = this.ms.navClick.subscribe( data => {
      switch (data) {
        case 'edit': {
          this.router.navigate(['../main/categories/edit/' + this.selected]);
          break;
        }
        case 'view details': {
          this.router.navigate(['../main/categories/details/' + this.selected]);
          break;
        }
        case 'delete': {
          this.deleteCategory();
          break;
        }
        case 'new category': {
          this.selected = '';
          this.router.navigate(['../main/categories/new']);
          break;
        }
      }
    });
    this.sub2 = this.css.storageEmitter.subscribe( (data: EventC) => {
      switch ( data.type ) {
        case 'delete': {
          this.selected = '';
          this.categories.splice(this.categoriesMap.get(data.value.name), 1);
          this.categoriesMap = new Map();
          for ( let i = 0; i < this.categories.length; i++ ) {
            this.categoriesMap.set(this.categories[i], i);
          }
          this.ms.setSelected('');
          break;
        }
        case 'create': {
          this.categories.push(data.value.name);
          this.selected = data.value.name;
          this.router.navigate(['../main/categories/edit/' + data.value.name]);
          break;
        }
        case 'update': {
          this.categories.splice(this.categoriesMap.get(data.value.name), 1, data.value.newName);
          this.categoriesMap.set(data.value.newName, this.categoriesMap.get(data.value.name));
          this.categoriesMap.delete(data.value.name);
          this.selected = data.value.newName;
          this.router.navigate(['../main/categories/edit/' + data.value.newName]);
          break;
        }
      }
    });
    const categories = this.css.getCategories();
    const iterator: IterableIterator<Category> = categories.values();
    let value = iterator.next().value;
    while ( value != undefined ) {
      this.categories.push(value.name);
      this.categoriesMap.set(value.name, this.categories.length - 1);
      value = iterator.next().value;
    }
  }
  setCategoryActions() {
    let actions = {
      1: ['new category', 'edit', 'view details', 'delete', ],
      2: ['new category'],
    };
    this.ms.setCategoryActions(actions);
  }
  deleteCategory() {
    this.css.deleteCategory(this.selected);
  }
  select(category) {
    this.selected = category;
    this.ms.setActions(1);
    this.ms.setSelected('');
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  onActivate(e) {
    console.log(e);
    if (e.action) {
      this.selected = e.action;
      this.ms.setHeader(e.action);
      this.ms.setActions(1);
      if (!e.type) {
        this.ms.setSelected('view details');
      }
      if (e.type == 'edit') {
        this.ms.setSelected('edit');
      }
    } else {
      this.ms.setHeader('Categories');
      this.selected = '';
      this.ms.setActions(2);
      this.ms.setSelected('new category');
    }
  }
  onDeactivate(e) {
    this.selected = '';
    this.ms.setHeader('Categories');
    this.ms.setActions(2);
    this.ms.setSelected('');
  }
}
