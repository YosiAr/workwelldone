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
    if (this.categories.has(name)) {
      return '';
    } else {
      this.categories.set(name, new Category(name));
      const cat = JSON.parse(localStorage.getItem('categories')) || {};
      cat[name] = true;
      localStorage.setItem('categories', JSON.stringify(cat));
      return name;
    }
  }
  deleteCategory(name: string): boolean {
    name = name.trim();
    name = name.toUpperCase();
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
    newName = newName.trim();
    newName = newName.toUpperCase();
    if (this.categories.has(name) && !this.categories.has(newName)) {
      this.categories.set(newName, new Category(newName));
      this.categories.delete(name);
      const cat = JSON.parse(localStorage.getItem('categories')) || {};
      delete(cat[name]);
      cat[newName] = true;
      localStorage.setItem('categories', JSON.stringify(cat));
      return newName;
    }
    return '';
  }
  checkCategoryName(name: string): boolean {
    name = name.trim();
    name = name.toUpperCase();
    return this.categories.has(name);
  }
  getLength(): number {
    return this.categories.size;
  }
  getCategories(): Map<string, Category> {
    return this.categories;
  }
}
