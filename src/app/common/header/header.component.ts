import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;

  constructor(public cartservice: CartService) {}

  ngOnInit(): void {
    this.getCartCount();
  }

  getCartCount() {
    this.cartservice.updateCount();
    this.cartservice.cartCount.subscribe((count) => {
      this.cartCount = count;
    });
  }
}
