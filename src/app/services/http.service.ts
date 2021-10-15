import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonService } from './common.service';
import { BASEAPIURL } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.commonService.setLoding(true);
    return next.handle(req).pipe(finalize(() => {
      this.commonService.setLoding(false);
    }));
  }

  get(url: string, headers?: any): Observable<any> {
    return this.http.get(BASEAPIURL + url, headers);
  }

  post(url: string, data: any, headers?: any): Observable<any> {
    return this.http.post(BASEAPIURL + url, data, headers);
  }

}
