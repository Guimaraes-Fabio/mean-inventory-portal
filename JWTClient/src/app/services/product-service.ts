import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly API_URL: string = 'https://mean-inventory-portal-4i7b.vercel.app/';

  constructor(private http: HttpClient) {
  }

  public createProduct(product: Product): Observable<Product> {
    const apiMethod = `${this.API_URL}/api/products`;
    return this.http.post<Product>(apiMethod, product);
  }

  public saveProduct(product: Product): Observable<boolean> {
    const apiMethod = `${this.API_URL}/api/products/${product.id}`;
    return this.http.patch<any>(apiMethod, product);
  }

  public deleteProduct(id: String): Observable<boolean> {
    const apiMethod = `${this.API_URL}/api/products/${id}`;
    return this.http.delete<any>(apiMethod);
  }

  public getProducts(): Observable<Product[]> {
    const apiMethod = `${this.API_URL}/api/products`;
    return this.http.get<Product[]>(apiMethod);
  }

  public getProduct(id: String): Observable<Product> {
    const apiMethod = `${this.API_URL}/api/products/${id}`;
    return this.http.get<Product>(apiMethod);
  }
}
