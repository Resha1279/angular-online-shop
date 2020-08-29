import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from 'src/app/product/product-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = 'http://localhost:3000/category/';

  constructor(private http: HttpClient) {}

  getCategoryList(id): Observable<ProductInterface[]> {
    return this.http.get(this.url + id + '/product').pipe(
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

  getCategories() {
    return this.http.get(this.url).pipe(
      map((data) => {
        const categoryArray: Array<any> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            categoryArray.push(data[id]);
          }
        }
        return categoryArray;
      })
    );
  }
}
