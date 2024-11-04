import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';

import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'], // Nota: debe ser `styleUrls` y no `styleUrl`
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  @Input() category_id: string = '';
  loading: boolean = true; // Propiedad para manejar el estado de carga

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.loading = true; // Inicia el indicador de carga
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading = false; // Detiene el indicador de carga
      },
      error: () => {
        this.loading = false; // Detiene el indicador de carga en caso de error
      }
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data.slice(0, 5));
      },
    });
  }
}
