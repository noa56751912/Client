import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Filters } from '../filters/filters';


@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductCard,Filters],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss'
})
export class ProductsPageComponent implements OnInit {
  allProducts: Product[] = [];
  displayProducts: Product[] = [];

  // ודאי שהגדרת private productService ב-constructor
  constructor(private productService: ProductService) {}

  ngOnInit() {
    // יצירת אובייקט פילטר מקומי לטעינה ראשונית
    const initialFilters = { page: 0, pageSize: 12 };

    this.productService.getProducts(initialFilters).subscribe((res: any) => {
      this.allProducts = res.data;
      this.displayProducts = res.data;
    });
  }

  updateDisplay(filteredList: Product[]) {
    this.displayProducts = filteredList;
  }
}