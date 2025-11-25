import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Subject, takeUntil } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  product: Product = new Product();
  messages: string[] = [];
  saveMessage: string = '';
  loadingProduct: boolean = false;
  productSaving: boolean = false;
  button: string = '';

  private id: string = '';
  private destroy$ = new Subject<void>();

  constructor(public productService: ProductService,
    private route: ActivatedRoute) {
    this.loadingProduct = false;
    this.productSaving = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.id = params['id'];
        this.getProduct();
      });
  }

  getProduct() {
    if (this.id != null) {
      this.loadingProduct = true;

      this.productService.getProduct(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: product => {
            if (product == null) {
              //This will give us a clear form as we are two way bound. Lets hide the form maybe
              this.messages.push(`Product ${this.id} not found.`);
              this.product = new Product();
            } else {
              this.loadingProduct = false;
              this.product = product;
              this.button = "Save Product";
            }
          },
          error: error => {
            this.loadingProduct = false;//Hide loader          
            this.messages.push(error);
          },
          complete: () => { }
        });
    } else {
      this.product = new Product();
      this.button = "Create Product";
    }
  }

  public onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.productSaving = true;
    this.product = form.value;
    this.messages = [];
    this.saveMessage = '';

    if (this.id === undefined) {
      this.createProduct(form);
    } else {
      this.saveProduct();
    }
  }

  /**
   * 
   * @param form 
   */
  private createProduct(form: NgForm) {
    this.productService.createProduct(this.product)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: product => {
        if (product.id != '') {
          this.saveMessage = `Product saved. Id: ${product.id}`;
          this.product = new Product();
          form.resetForm();
        } else {
          this.messages.push('An error occured creating the product via REST API');
        }
      },
      error: errors => {
        this.messages.push(...errors.error);
        this.productSaving = false;
      },
      complete: () => { this.productSaving = false; }
    });
  }

  /**
   * 
   * @param form 
   */
  private saveProduct() {
    this.productService.saveProduct(this.product)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: result => {
        if (result) {
          this.saveMessage = `Product saved. Id: ${this.product.id}`;
        } else {
          this.messages.push('An error occured creating the product via REST API');
        }
      },
      error: errors => {
        this.messages.push(...errors.error);
        this.productSaving = false;
      },
      complete: () => { this.productSaving = false; }
    });
  }
}
