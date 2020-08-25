import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/product/product-interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
})
export class ProductDetailsComponent implements OnInit {
  public productId: number;

  product: ProductInterface;

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      console.log('id in product::', this.productId);
      this.productservice.getProduct(this.productId).subscribe((data) => {
        this.product = data;
      });
    });
  }
}
