import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-produtc-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtc-detail.component.html',
  styleUrl: './produtc-detail.component.css',
})
export default class ProdutcDetailComponent {
  @Input() id?: string;

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | null>(null);

  cover = signal('')

  ngOnInit(): void {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
              this.cover.set(product.images[0])
          }
        },
      });
    }
  }

  changeCover(newImage: string){
    this.cover.set(newImage)
  }


  addToCart() {
    const product = this.product()
    if (product) {
      this.cartService.addToCart(product)
    }
  }

}
