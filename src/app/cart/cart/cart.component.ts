import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductInterface } from 'src/app/product/product-interface';
import { CartInterface } from 'src/app/cart/cart-interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {

  cartIds: Array<number> = [];
  products: Array<ProductInterface> = [];
  cartCount: Array<any> = [];
  productsMerged: Array<any> = [];
  total: number = 0;

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

      this.getCartItemCounts(result);

      this.loadProducts();
    });
  }

  loadProducts() {
    let c = 0;
    this.cartIds.forEach((id) => {
      this.productservice.getProduct(id).subscribe((data) => {
        this.products.push(data);
        c++;
        if (c === this.cartIds.length) {
          this.mergeProductsCounts();
        }
      });
    });
  }

  onCartItemDelete(id) {
    this.cartservice.deleteCartItem(id);

    for (let i = 0; i < this.productsMerged.length; i++) {
      if (this.productsMerged[i].id === id) {
        this.productsMerged.splice(i, 1);
      }
    }
    this.getSum(this.productsMerged);
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

    this.cartCount = Object.keys(counts).map((k) => {
      return { id: +k, count: counts[k] };
    });
  }

  mergeProductsCounts() {
    for (let i = 0; i < this.products.length; i++) {
      this.productsMerged.push({
        ...this.products[i],
        ...this.cartCount.find((item) => item.id === this.products[i].id),
      });
    }

    this.getSum(this.productsMerged);
  }

  getSum(data) {
    this.total = data.reduce((sum, { price, count }) => sum + price * count, 0);
  }

  onClickPlus(id) {
    this.cartservice.addToCart(id).subscribe();
    this.productsMerged.find((item) => (item.count = item.count + 1));
    this.getSum(this.productsMerged);
  }

  onClickMinus(id) {
    if (this.productsMerged.find((item) => item.count > 1)) {
      this.cartservice.deleteOneItem(id);
      this.productsMerged.find((item) => (item.count = item.count + -1));
      this.getSum(this.productsMerged);
    }
  }
}
