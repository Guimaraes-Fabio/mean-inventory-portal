import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {

  public loadingProducts: boolean = false;
  public messages: string[] = [];
  public products: Product[] = [];
  public errors: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loadingProducts = true;
    this.productService.getProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: products => {
        this.products = products;
      },
      error: error => {
        this.messages.push(error.message);
        this.loadingProducts = false;
      },
      complete: () => {
        this.loadingProducts = false;
      }
    });
  }
}
