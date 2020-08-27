import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
    this.cartservice.getCart().subscribe((result) => {
      this.cartCount = result.length;
    });
  }
}
