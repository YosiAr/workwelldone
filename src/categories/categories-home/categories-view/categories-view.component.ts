import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesStorageService } from 'src/shared/services/categories-storage.service';
import { EventC } from 'src/categories/models/category-models';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent implements OnDestroy {
  private sub: Subscription;
  private sub2: Subscription;
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
      this.action = params.value;
      if (!this.css.checkCategoryName(this.action)) {
        this.router.navigate(['../main/categories']);
      }
      this.type = this.route.snapshot.data.type;
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
}
