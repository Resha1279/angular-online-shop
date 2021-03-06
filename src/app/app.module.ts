import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './template/banner/banner.component';
import { CartComponent } from './cart/cart/cart.component';

import { ProductService } from './service/product.service';
import { CartService } from './service/cart.service';
import { CategoryService } from './service/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarRatingComponent } from './template/star-rating/star-rating.component';
import { ImagePlaceholderDirective } from './image-placeholder.directive';
import { PlaceholderComponent } from './template/placeholder/placeholder.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCardComponent } from './category/category-card/category-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    BannerComponent,
    CartComponent,
    StarRatingComponent,
    ImagePlaceholderDirective,
    PlaceholderComponent,
    CategoryListComponent,
    CategoryCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [ProductService, CartService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
