import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication-service';

@Component({
  selector: 'app-product-table',
  standalone: false,
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
})
export class ProductTable implements OnInit, OnDestroy {
  @Input() products: Product[] = [];

  deletingProduct: boolean = false;
  messages: string[] = [];
  showCreate: boolean = false;
  userIsAuthenticated: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private authService: AuthenticationService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
  }

  deleteProduct(id: String) {
    this.deletingProduct = true;
    this.productService.deleteProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: result => {
          if (result) {
            this.products = this.products.filter(p => p.id !== id);

            this.showCreate = !this.products.length;
          }
        },
        error: error => { this.deletingProduct = false; },
        complete: () => { this.deletingProduct = false; }
      })
  }
}
