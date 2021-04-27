import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/product/product-interface';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
})
export class ProductDetailsComponent implements OnInit {
  public productId: number;
  images: Array<string> = [];
  slide: Array<string> = [];
  productImage: string;
  productImageIndex: number = 0;

  next: boolean = false;
  nextCount: number = 3;

  product: ProductInterface;

  faNext = faAngleRight;
  faPrev = faAngleLeft;

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
        this.images = data.images;
        this.productImage = data.images[0];

        if (this.images.length > 4) {
          this.next = true;
          for (let i = 0; i < 4; i++) {
            this.slide.push(this.images[i]);
          }
        }
      });
    });
  }

  onClickAddToCart() {
    this.cartservice.addToCart(this.productId).subscribe(() => {
      this.cartservice.updateCount();
    });
  }

  onClickImage(image, index) {
    this.productImage = image;
    this.productImageIndex = index;
  }

  onClickNext() {
    //this.slide.slice(1, 3);
    if (this.nextCount < this.images.length - 1) {
      this.slide.push(this.images[(this.nextCount += 1)]);
    }
    if (this.productImageIndex < this.images.length - 1) {
      this.productImage = this.images[(this.productImageIndex += 1)];
    }
  }

  onClickPrev() {
    if (this.productImageIndex > 0) {
      this.productImage = this.images[(this.productImageIndex -= 1)];
    }
  }
}
