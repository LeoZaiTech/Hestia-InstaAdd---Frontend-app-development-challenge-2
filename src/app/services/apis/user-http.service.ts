import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { StorageService } from '../storage/storage.service';
import { LoadingService } from '../components/loading.service';
import { UserInfo } from 'src/app/models/components/user-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService extends ApiBaseService {
  constructor(
    protected override http: HttpClient,
    protected override storageService: StorageService,
    private loadingService: LoadingService
  ) {
    super(http, storageService, '', environment.apiHost);
  }

  /**
   * Gets logged in user
   */
  getLoggedInUser(): Observable<UserInfo | null> {
    return this.http.get<UserInfo>(this.endpoint('/auth/me'));
  }
}
