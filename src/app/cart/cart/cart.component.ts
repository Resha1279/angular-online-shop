import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductInterface } from 'src/app/product/product-interface';
import { CartInterface } from 'src/app/cart/cart-interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  cartIds: Array<number> = [];
  products: Array<ProductInterface> = [];
  cartCount: Array<any> = [];

  constructor(
    private cartservice: CartService,
    private productservice: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartservice.getCart().subscribe((result) => {
      this.cartIds = [...new Set(result.map((item) => item.productId))];
      // for (const index in result) {
      //   if (result.hasOwnProperty(index)) {
      //     this.cartIds.push(result[index].productId);
      //   }
      // }

      this.getCartItemCounts(result);

      this.loadProducts();
    });
  }

  loadProducts() {
    this.cartIds.forEach((id) => {
      this.productservice.getProduct(id).subscribe((data) => {
        this.products.push(data);
      });
    });
  }

  onCartItemDelete(id) {
    this.cartservice.deleteCartItem(id);

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
      }
    }
  }

  getCartItemCounts(result) {
    let counts = result.reduce((p, c) => {
      let id = c.productId;
      if (!p.hasOwnProperty(id)) {
        p[id] = 0;
      }
      p[id]++;
      return p;
    }, {});
    console.log(counts);

    this.cartCount = Object.keys(counts).map((k) => {
      return { id: k, count: counts[k] };
    });
    console.log(this.cartCount);
  }
}
