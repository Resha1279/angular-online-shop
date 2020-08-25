import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from 'src/app/product/product-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //cartIds: number;
  private url: string = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCart() {
    let cartIdArray: Array<number> = [];
    return this.http.get(this.url).pipe(
      map((data) => {
        console.log('data', data);

        for (const index in data) {
          console.log('index in data', index);
          if (data.hasOwnProperty(index)) {
            cartIdArray.push(data[index].id);
          }
        }
        console.log('cartIdArray', cartIdArray);
        return cartIdArray;
      })
    );
  }
}
