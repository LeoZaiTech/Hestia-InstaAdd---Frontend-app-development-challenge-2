import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { StorageService } from '../storage/storage.service';
import { LoadingService } from '../components/loading.service';
import { environment } from 'src/environments/environment';
import { Vendor } from 'src/app/models/apis/vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorService extends ApiBaseService {
  constructor(
    protected override http: HttpClient,
    protected override storageService: StorageService,
    private loadingService: LoadingService
  ) {
    super(http, storageService, '', environment.apiHost);
  }

  /**
   * Gets all vendors
   */
  getVendors(): Observable<Vendor[]> {
    return this.http
      .get<Vendor[]>(this.endpoint('/vendors'))
      .pipe(this.networkError<Vendor[]>())
      .pipe(
        map((response) => {
          return response || [];
        })
      );
  }
}
