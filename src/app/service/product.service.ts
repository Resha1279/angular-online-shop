import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from 'src/app/product/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.getAllProducts().pipe(
      map((productArray) => {
        return productArray.find((p) => p.id === id);
      })
    );
  }

  getAllProducts(): Observable<ProductInterface[]> {
    return this.http.get(this.url).pipe(
      map((data) => {
        const productsArray: Array<ProductInterface> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            productsArray.push(data[id]);
          }
        }
        return productsArray;
      })
    );
  }
}
