export interface EventC {
  type: string;
  value: {
    name: string,
    newName?: string
  };
}
export class Category {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
export class CategoryList {
  private categories: Map<string, Category>;
  constructor() {
    this.categories = new Map();
  }
  addCategory(name: string): string {
    name = name.trim();
    name = name.toUpperCase();
    let _name = name;
    _name  = _name.replace(' ', '_');
    if (this.categories.has(name)) {
      return '';
    } else {
      this.categories.set(_name, new Category(name));
      const cat = JSON.parse(localStorage.getItem('categories')) || {};
      cat[_name] = name;
      localStorage.setItem('categories', JSON.stringify(cat));
      return name;
    }
  }
  deleteCategory(name: string): boolean {
    name = name.trim();
    name = name.toUpperCase();
    name  = name.replace(' ', '_');
    console.log(name);
    console.log(this.categories);
    if (this.categories.has(name)) {
      this.categories.delete(name);
      const cat = JSON.parse(localStorage.getItem('categories')) || {};
      delete(cat[name]);
      localStorage.setItem('categories', JSON.stringify(cat));
      return true;
    }
    return false;
  }
  editCategoryName(name: string, newName: string): string {
    name  = name.replace(' ', '_');
    newName = newName.trim();
    newName = newName.toUpperCase();
    let _newName = newName;
    _newName  = _newName.replace(' ', '_');
    if (this.categories.has(name) && !this.categories.has(_newName)) {
      this.categories.set(_newName, new Category(newName));
      this.categories.delete(name);
      const cat = JSON.parse(localStorage.getItem('categories')) || {};
      delete(cat[name]);
      cat[_newName] = newName;
      localStorage.setItem('categories', JSON.stringify(cat));
      return newName;
    }
    return '';
  }
  checkCategoryName(name: string): boolean {
    name = name.trim();
    name = name.toUpperCase();
    name  = name.replace(' ', '_');
    return this.categories.has(name);
  }
  getLength(): number {
    return this.categories.size;
  }
  getCategories(): Map<string, Category> {
    return this.categories;
  }
}
