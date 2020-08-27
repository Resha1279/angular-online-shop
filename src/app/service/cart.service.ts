import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from 'src/app/product/product-interface';
import { CartInterface } from 'src/app/cart/cart-interface';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'http://localhost:3000/cart/';

  constructor(private http: HttpClient) {}

  addToCart(data) {
    return this.http.post(this.url, { productId: data });
  }

  getCart() {
    let cartIdArray: Array<CartInterface> = [];

    return this.http.get(this.url).pipe(
      map((data) => {
        for (const index in data) {
          if (data.hasOwnProperty(index)) {
            cartIdArray.push(data[index]);
          }
        }
        return cartIdArray;
      })
    );
  }

  deleteCartItem(id) {
    return this.getCart().subscribe(
      (result) => {
        for (const item in result) {
          if (result[item].productId == id) {
            this.http.delete(this.url + result[item].id).subscribe(() => {
              console.log('cart deleted', item);
            });
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteOneItem(id) {
    return this.getCart().subscribe(
      (result) => {
        for (const item in result) {
          if (result[item].productId == id) {
            return this.http
              .delete(this.url + result[item].id)
              .subscribe(() => {
                console.log('cart deleted', item);
              });
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public cartCount : number = 0
  updateCount(){
    this.getCart().subscribe(result=>{
      this.cartCount = result.length
    })
  }
}
