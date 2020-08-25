import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ProductInterface } from 'src/app/product/product-interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  products: Array<ProductInterface>;

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe(
      (result) => {
        console.log(result);
        this.products = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
