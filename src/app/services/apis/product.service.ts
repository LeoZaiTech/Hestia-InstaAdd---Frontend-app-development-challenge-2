import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { StorageService } from '../storage/storage.service';
import { LoadingService } from '../components/loading.service';
import { environment } from 'src/environments/environment';
import { Product, ProductSearchRequest } from 'src/app/models/apis/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiBaseService {
  constructor(
    protected override http: HttpClient,
    protected override storageService: StorageService,
    private loadingService: LoadingService
  ) {
    super(http, storageService, '', environment.apiHost);
  }

  /**
   * Search for a product by code
   */
  searchProductByCode(
    queryParameters: ProductSearchRequest
  ): Observable<HttpResponse<Product> | null> {
    return this.http
      .get<Product>(
        this.endpoint(`/products${this.createQueryParams<ProductSearchRequest>(queryParameters)}`),
        { observe: 'response' }
      )
      .pipe(this.networkError<HttpResponse<Product>>());
  }
}
