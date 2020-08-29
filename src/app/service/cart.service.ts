import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from 'src/app/product/product-interface';
import { CartInterface } from 'src/app/cart/cart-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'http://localhost:3000/cart/';
  cartIdArray: Array<CartInterface> = [];

  cartCount = new Subject<number>();

  constructor(private http: HttpClient) {}

  addToCart(data) {
    return this.http.post(this.url, { productId: data });
  }

  getCart() {
    let cartArray: Array<CartInterface> = [];
    return this.http.get(this.url).pipe(
      map((data) => {
        for (const index in data) {
          if (data.hasOwnProperty(index)) {
            cartArray.push(data[index]);
          }
        }
        this.cartIdArray = cartArray;
        return cartArray;
      })
    );
  }

  deleteCartItem(id) {
    this.cartIdArray.forEach((item) => {
      if (item.productId === id) {
        this.http.delete(this.url + item.id).subscribe();
      }
    });
  }

  deleteOneItem(id) {
    let value = this.cartIdArray.find((item) => {
      return item.productId === id;
    });
    console.log('found', value);
    return this.http.delete(this.url + value.id);
  }

  updateCount() {
    let count = 0;
    this.getCart().subscribe(
      (result) => {
        count = result.length;
      },
      () => {},
      () => {
        this.cartCount.next(count);
      }
    );
  }
}
