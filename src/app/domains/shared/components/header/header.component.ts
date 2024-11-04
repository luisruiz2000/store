import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';

import { CartService } from '../../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  totalCart = signal(0);
  private cartService = inject(CartService);

  cart = this.cartService.cart;

  total = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product); // Llama al método del servicio para eliminar el producto
  }
}
