import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { NavigationService } from 'app/navigation.service';
import { ApiService } from '~api/api.service';
import { ModalService } from '~common/modal/modal.service';
import { ToastrService } from '~common/toastr/toastr.service';
import { SessionService } from './session.service';
import { IAction, IRawClient, IClient, IAppState, IRawError, IError, IResponse } from '~schema';
import { ClientMapper } from '~transform/client';

@Injectable()
export class ClientService {
  constructor(
    private navigationService: NavigationService,
    private apiService: ApiService,
    private clientMapper: ClientMapper,
    private modalService: ModalService,
    private toastrService: ToastrService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  public checkAuthentication(): void {
    if (this.sessionService.isLoggedIn()) {
      this.apiService.setToken();

      this.apiService
        .get<IRawClient>('client/login')
        .map<IRawClient | IRawError, IClient | IError>(data => this.clientMapper.map(data))
        .subscribe(this.sessionService.startSession.bind(this.sessionService));
    }
  }

  public showLoginModal(kickOutOnCancel = false) {
    this.modalService.show({
      url: 'client-login',
      hasControls: false,
      title: 'Member Log In',
      onCancel: () => {
        if (kickOutOnCancel) {
          this.navigationService.goHome();
        }
      }
    });
  }

  public login(form: FormGroup): Observable<IClient | IError> {
    return this.enter('client/login', form);
  }

  public register(form: FormGroup): Observable<IClient | IError> {
    return this.enter('client/register', form);
  }

  public logout(): void {
    this.modalService.show({
      title: 'Logout',
      confirmButton: 'Log out',
      tpl: `
        <p>
          Are you sure you want to logout?
        </p>
      `,
      onConfirm: () => {
        this.sessionService.endSession();
        this.navigationService.refreshPage();
      }
    });
  }

  public getClientSearches(clientId: string): Observable<any> {
    const params = { clientId };

    return this.apiService
      .get('client/searches', { params });
  }

  public requestPasswordReset(form: FormGroup): Observable<any> {
    return this.apiService
      .post<IResponse>('client/request-password-reset', form.value)
      .map((data: IResponse) => {
        if (!!data.error_message) {
          return { errorMessage: data.error_message};
        } else {
          return {};
        }
      });
  }

  public resetPassword(form: FormGroup): Observable<any> {
    return this.apiService
      .post<IRawClient | IRawError>('client/reset-password', form.value)
      .map<IRawClient | IRawError, IClient | IError>(data => this.clientMapper.map(data));
  }

  public showThankYouModal(message: string) {
    this.modalService.show({
      title: 'Thank you!',
      size: 'sm',
      cssClass: 'lk-modal_thank-you',
      hasControls: false,
      tpl: `<span class="promo-text">${message}</span>`,
      onCancel: () => this.navigationService.refreshPage()
    });
  }

  public showRegisterModal() {
    this.modalService.show({
      title: 'Become a Member<h4>And Gain Access to All the Listings in Your Market.</h4>',
      hasControls: false,
      url: 'register',
      size: 'lg',
      cssClass: 'lk-modal_register'
    });
  }

  private enter(url: string, form: FormGroup): Observable<IClient | IError> {
    const response = this.apiService
      .post<IRawClient | IRawError>(url, form.value)
      .map<IRawClient | IRawError, IClient | IError>(data => this.clientMapper.map(data));

    response
      .subscribe(this.sessionService.startSession.bind(this.sessionService));

    return response;
  }
}
