import {
  Directive,
  Input,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src',
  },
})
export class ImagePlaceholderDirective {
  @Input() src: string;
  @Input() default: string;

  constructor(private cdr: ChangeDetectorRef) {}

  detach() {
    this.cdr.detach();
  }

  updateUrl() {
    this.src = this.default;
    // this.detach();
  }
}
