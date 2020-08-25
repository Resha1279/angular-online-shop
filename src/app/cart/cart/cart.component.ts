import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductInterface } from 'src/app/product/product-interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  cartIds: Array<number> = [];
  cartId: number;
  products: Array<ProductInterface> = [];

  constructor(
    private cartservice: CartService,
    private productservice: ProductService
  ) {}

  ngOnInit(): void {
    this.cartservice.getCart().subscribe((result) => {
      this.cartIds = result;
      console.log('cartid::', this.cartIds);

      this.cartIds.forEach((id) => {
        console.log('id::', id);
        this.productservice.getProduct(id).subscribe((data) => {
          console.log('data in cart:', data);
          this.products.push(data);
          console.log('products::', this.products);
        });
      });
    });
  }
}
