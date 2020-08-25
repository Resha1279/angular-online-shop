import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../product-interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface;

  constructor() {}

  ngOnInit(): void {}
}
