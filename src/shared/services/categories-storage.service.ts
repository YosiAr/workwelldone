import { Injectable } from '@angular/core';
import { CategoryList, Category } from 'src/categories/models/category-models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStorageService {
  private categoryList: CategoryList;
  public storageEmitter: Subject<any> = new Subject();
  constructor() {
    this.categoryList = new CategoryList();
    this.getCategoriesFromStorage();
  }
  getCategoriesFromStorage() {
    const cat = JSON.parse(localStorage.getItem('categories')) || {};
    const arr = Object.keys(cat);
    for ( let i = 0; i < arr.length ; i++ ) {
      this.categoryList.addCategory(arr[i]);
    }
  }
  getCategories(): Map<string, Category> {
    return this.categoryList.getCategories();
  }
  checkCategoryName(name: string): boolean {
    return this.categoryList.checkCategoryName(name);
  }
  getLength(): number {
    return this.categoryList.getLength();
  }
  addCategory(name: string): boolean {
    const result = this.categoryList.addCategory(name);
    if (result) {
      const data = {
        type: 'create',
        value: {
          name: result
        }
      };
      this.storageEmitter.next(data);
      return true;
    }
    return false;
  }
  deleteCategory(name: string): boolean {
    const result = this.categoryList.deleteCategory(name);
    if (result) {
      const data = {
        type: 'delete',
        value: {
          name
        }
      };
      this.storageEmitter.next(data);
    }
    return result;
  }
  editCategory(name: string, newName: string) {
    const result = this.categoryList.editCategoryName(name, newName);
    if (result) {
      const data = {
        type: 'update',
        value: {
          name,
          newName: result
        }
      };
      this.storageEmitter.next(data);
    }
    return result;
  }
}
