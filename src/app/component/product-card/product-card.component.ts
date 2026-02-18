import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// 👇 שימי לב: חייב להיות כתוב Module בסוף!
import { ButtonModule } from 'primeng/button'; 
import { CardModule } from 'primeng/card';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  // 👇 גם כאן: חובה להשתמש במודולים
  imports: [CommonModule, ButtonModule, CardModule], 
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCard {
  @Input() product!: Product; 
  getSafeUrl(url: string): string {
    return encodeURI(url);
}
}
