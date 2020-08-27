import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/product/product-interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
})
export class ProductDetailsComponent implements OnInit {
  public productId: number;
  public quantity: number = 1;

  product: ProductInterface;

  constructor(
    private productservice: ProductService,
    private cartservice: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.productservice.getProduct(this.productId).subscribe((data) => {
        this.product = data;
      });
    });
  }

  onClickAddToCart() {
    this.cartservice.addToCart(this.productId).subscribe();
  }
}
