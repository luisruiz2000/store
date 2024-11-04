import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Cambia la estructura de cart a un arreglo de CartItem
  cart = signal<CartItem[]>([]);

  // Calcula el total del carrito sumando el precio por la cantidad de cada producto
  total = computed(() => {
    const cartItems = this.cart();
    return cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  });

  constructor() { }

  addToCart(product: Product) {
    this.cart.update(state => {
      const existingItem = state.find(item => item.product.id === product.id); // Verifica si el producto ya está en el carrito

      if (existingItem) {
        // Si existe, incrementa la cantidad
        existingItem.quantity += 1;
        return [...state]; // Devuelve el estado actualizado
      } else {
        // Si no existe, agrega el nuevo producto con cantidad 1
        return [...state, { product, quantity: 1 }];
      }
    });
  }

  removeFromCart(product: Product) {
    this.cart.update(state => {
      const existingItemIndex = state.findIndex(item => item.product.id === product.id); // Encuentra el índice del producto en el carrito

      if (existingItemIndex > -1) {
        // Si existe, elimina el producto del carrito
        const updatedCart = [...state]; // Crea una copia del estado actual
        updatedCart.splice(existingItemIndex, 1); // Elimina el producto
        return updatedCart; // Devuelve el carrito actualizado
      }

      return state; // Si no existe, devuelve el estado sin cambios
    });
  }

}
