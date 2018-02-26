import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { dispatch } from '@angular-redux/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '~env/environment';
import actions from './api.actions';
import { IAction } from '~schema';
import { SessionService } from 'app/client/session.service';
import { ToastrService } from '~common/toastr/toastr.service';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;
  private headers: Headers;

  constructor(
    private http: Http,
    private sessionService: SessionService,
    private toastrService: ToastrService
  ) { }

  public get<T>(path: string, options: RequestOptionsArgs = {}, isMajor?: boolean): Observable<T> {
    options.headers = this.headers;
    return this.request(this.http.get(this.getPath(path), options), isMajor);
  }

  public post<T>(path: string, body = {}, options: RequestOptionsArgs = {}, isMajor?: boolean): Observable<T> {
    options.headers = this.headers;
    return this.request(this.http.post(this.getPath(path), body, options), isMajor);
  }

  public setToken(): void {
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.sessionService.token });
  }

  private request<T>(request: Observable<Response>, isMajor = true): Observable<T> {
    if (isMajor) {
      this.onRequestStart();
    }

    request = request.share();
    request.subscribe(finalizeRequest.bind(this), onRequestError.bind(this));

    return request
      .map<Response, T>((res: Response): T => {
        return res.json();
      });

    function finalizeRequest(): void {
      if (isMajor) {
        this.onRequestComplete();
      }
    }

    function onRequestError(response: Response) {
      finalizeRequest.bind(this)();

      if (isUnautorized(response) && !!this.sessionService.token) {
        this.sessionService.expireSession();
      }

      if (response.status >= 500) {
        this.toastrService.pop({
          type: 'error',
          title: 'Error',
          message: 'Something went wrong. Please try again later.'
        });
      }
    }

    function isUnautorized(response: Response) {
      return response.status === 401;
    }
  }

  private getPath(path: string): string {
    return this.apiUrl + path;
  }

  @dispatch()
  private onRequestStart(): IAction {
    return {
      type: actions.ADD_REQUEST
    };
  }

  @dispatch()
  private onRequestComplete(): IAction {
    return {
      type: actions.SUBSTRACT_REQUEST
    };
  }
}
