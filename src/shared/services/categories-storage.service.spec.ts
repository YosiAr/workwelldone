import { TestBed } from '@angular/core/testing';

import { CategoriesStorageService } from './categories-storage.service';

describe('CategoriesStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesStorageService = TestBed.get(CategoriesStorageService);
    expect(service).toBeTruthy();
  });
});
