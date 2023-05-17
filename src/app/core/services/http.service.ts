import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  public createDefaultOptions(): Options {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public createOptions(opts?: Options): Options {
    const defaultOpts: Options = this.createDefaultOptions();
    if (opts) {
      opts = {
        params: opts.params || defaultOpts.params,
        headers: opts.headers || defaultOpts.headers,
      };
      if (!opts.headers?.get('Content-Type')) {
        const defaultContentType = defaultOpts.headers?.get('Content-Type');
        if (defaultContentType) {
          opts.headers = opts.headers?.set('Content-Type', defaultContentType);
        }
      }
    }
    return opts || defaultOpts;
  }

  public doGet<T>(serviceUrl: string, opts?: Options): Observable<T> {
    const ropts = this.createOptions(opts);
    return this.http.get<T>(serviceUrl, ropts);
  }

  public doPost<T, R>(
    serviceUrl: string,
    body: T,
    opts?: Options
  ): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http.post<R>(serviceUrl, body, ropts);
  }

  public doPut<T, R>(
    serviceUrl: string,
    body: T,
    opts?: Options
  ): Observable<R> {
    const ropts = this.createOptions(opts);
    return this.http.put<R>(serviceUrl, body, ropts);
  }

  public doDelete<R>(serviceUrl: string, opts?: Options): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http.delete<R>(serviceUrl, ropts);
  }
}
