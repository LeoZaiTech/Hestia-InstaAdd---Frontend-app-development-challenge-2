import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InfoModalService } from '../components/info-modal.service';
import { StorageService } from '../storage/storage.service';
import { isDefined } from '../../utils/validation.util';

export type UndefinedParams = Record<string, unknown>;

const { apiHost } = environment;

export class ApiBaseService {
  // endpoint base url
  protected readonly endpointBase: string;
  // api host
  protected readonly host: string = apiHost;

  private infoModalService = inject(InfoModalService);

  constructor(
    protected http: HttpClient,
    protected storageService: StorageService,
    path = '',
    host = apiHost
  ) {
    this.endpointBase = host + path;
  }

  get<T>(path: string, params?: HttpParams | Record<string, string | string[]>): Observable<T> {
    return this.http.get<T>(apiHost + path, {
      params,
    });
  }

  put<T>(
    path: string,
    body: unknown,
    params?: HttpParams | Record<string, string | string[]>
  ): Observable<T> {
    const token = this.storageService.token;
    return this.http.put<T>(apiHost + path, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params,
    });
  }

  post<T>(
    path: string,
    body: unknown,
    params?: HttpParams | Record<string, string | string[]>
  ): Observable<T> {
    return this.http.post<T>(apiHost + path, body, {
      params,
    });
  }

  patch<T>(
    path: string,
    body: unknown,
    params?: HttpParams | Record<string, string | string[]>
  ): Observable<T> {
    const token = this.storageService.token;
    return this.http.patch<T>(apiHost + path, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params,
    });
  }

  delete<T>(path: string, params?: HttpParams | Record<string, string | string[]>): Observable<T> {
    return this.http.delete<T>(apiHost + path, {
      params,
    });
  }

  /**
   * get api endpoint
   * @param path path
   */
  protected endpoint(path = ''): string {
    return this.endpointBase + path;
  }

  /**
   * create http params from object type params
   * @param params params
   */
  protected getHttpParams(params: UndefinedParams): Record<string, string> {
    const refined: Record<string, string> = {};

    Object.keys(params || {}).forEach((key) => {
      if (isDefined(params[key])) {
        refined[key] = params[key] + '';
      }
    });

    return refined;
  }

  /**
   * Create query parameters string from the provided object.
   *
   * @param _param - The query parameter object.
   * @returns A string representing the query parameters to be appended to the API URL.
   */
  protected createQueryParams<T>(_param: T): string {
    let param = '?';
    Object.keys(_param || {}).forEach((key) => {
      if (key) {
        const value = _param[key as keyof T];
        if (value === 0 || value === false || !!value) {
          param += `${key}=${value}&`;
        }
      }
    });
    const out = param === '?' ? '' : param.slice(0, -1);
    return out;
  }

  /**
   * Error handling with API calls
   */
  networkError<T>() {
    return catchError<T, Observable<null>>((err) => {
      console.error('API Error:', err);
      this.infoModalService.show(err.message || 'API error');
      return of(null);
    });
  }
}
