import { Component, OnInit, Input } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as Star } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;

  regular= Star;
  solid= faStar;
  half=faStarHalfAlt;

  iconClass = {
    0: this.regular,
    0.5: this.half,
    1: this.solid,
  };

  stars: number[] = [0, 0, 0, 0, 0]; //five empty stars

  constructor() {}

  ngOnChanges() {
    this.fillStars();
  }

  ngOnInit() {}

  fillStars() {
    var starsToFill = Math.round(this.rating * 2) / 2; //round to nearest 0.5
    var i = 0;
    while (starsToFill > 0.5) {
      this.stars[i] = 1;
      i++;
      starsToFill--;
    }
    if (starsToFill === 0.5) {
      this.stars[i] = 0.5;
    }
  }
}
