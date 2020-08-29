import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ProductInterface } from 'src/app/product/product-interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass'],
})
export class CategoryListComponent implements OnInit {
  products: Array<ProductInterface>;
  categoryId: number;
  categoryName: any;

  constructor(
    private categoryservice: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategoryList();
  }

  getCategoryDetails() {
    this.categoryservice.getCategories().subscribe((result) => {
      this.categoryName = result.find((x) => x.id === this.categoryId).name;
      console.log(this.categoryName);
    });
  }

  loadCategoryList() {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.categoryservice
        .getCategoryList(this.categoryId)
        .subscribe((result) => {
          console.log(result);
          this.products = result;
        });
    });

    this.getCategoryDetails();
  }
}
