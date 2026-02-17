import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; 

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PanelModule, 
    ListboxModule, 
    SliderModule, 
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './filters.html',
  styleUrls: ['./filters.scss']
})
export class Filters implements OnInit {
  @Input() allProducts: Product[] = []; 
  @Output() filteredResults = new EventEmitter<Product[]>();

  categories: Category[] = [];
  selectedCategories: any[] = [];
  rangeValues: number[] = [0, 15000];
  searchTerm: string = ''; 

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.cd.detectChanges(); 
    });
  }

updateFilters() {
    const results = this.allProducts.filter(p => {
     
        const product = p as any;
        const price = product.price ?? product.Price;
        const name = product.productName ?? product.ProductName;
        const desc = product.description ?? product.Description;
        const catId = product.categoryId ?? product.CategoryId;

        const search = this.searchTerm.toLowerCase();
        const matchesSearch = !search || 
            (name && name.toLowerCase().includes(search)) || 
            (desc && desc.toLowerCase().includes(search));

        const matchesPrice = price >= this.rangeValues[0] && price <= this.rangeValues[1];
        
        const matchesCategory = this.selectedCategories.length === 0 || 
            this.selectedCategories.some(c => Number(c.categoryId ?? c.CategoryId) === Number(catId));
        
        return matchesSearch && matchesPrice && matchesCategory;
    });

    console.log('✅ תוצאות לאחר סינון:', results.length);
    this.filteredResults.emit(results);
}

  reset() {
    this.selectedCategories = [];
    this.rangeValues = [0, 15000];
    this.searchTerm = '';
    this.filteredResults.emit(this.allProducts); 
  }
}