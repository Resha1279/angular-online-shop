import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductInterface } from 'src/app/product/product-interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  products: Array<ProductInterface>;
  isLoading: boolean = true;

  constructor(
    private productservice: ProductService,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe(
      (result) => {
        console.log(result);
        this.products = result;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
