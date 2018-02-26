import { dispatch } from '@angular-redux/store';

import actions from './modal.actions';
import { IModalSettings, IModal, IAction } from '~schema';

export class Modal implements IModal {
  public id: number;
  public tpl: string;
  public url: string;
  public title: string;
  public confirmButton: string;
  public cancelButton: string;
  public hasControls: boolean;
  public isActive: boolean;
  public isVisible: boolean;
  public size: 'sm' | 'md' | 'lg';

  private confirmFunction: () => void;
  private cancelFunction: () => void;

  constructor(
    private settings: IModalSettings
  ) {
    this.id = new Date().getTime();
    this.tpl = settings.tpl;
    this.url = settings.url;
    this.title = settings.title;
    this.confirmButton = settings.confirmButton === null ? null : (settings.confirmButton || 'Confirm');
    this.cancelButton = settings.cancelButton === null ? null : (settings.cancelButton || 'Cancel');
    this.hasControls = settings.hasControls === false ? false : true;
    this.isActive = true;
    this.confirmFunction = settings.onConfirm;
    this.cancelFunction = settings.onCancel;

    this.show();
    setTimeout(() => this.animate(true), 50);
  }

  public close(confirm = false): void {
    this.isActive = false;
    this.animate(false);

    setTimeout(() => {
      this.hide();

      if (confirm && !!this.confirmFunction) {
        this.confirmFunction();
      } else if (!!this.cancelFunction) {
        this.cancelFunction();
      }
    }, 300);
  }

  public get cssClass(): string {
    const classes = {
      sm: 'small',
      lg: 'large'
    };

    return (this.settings.cssClass || '') + ' ' +
      (!!classes[this.settings.size] ? `is-${classes[this.settings.size]}` : '');
  }

  @dispatch()
  private show(): IAction {
    return {
      type: actions.OPEN_MODAL,
      id: this.id,
      url: this.url,
      tpl: this.tpl,
      title: this.title,
      cssClass: this.cssClass,
      confirmButton: this.confirmButton,
      cancelButton: this.cancelButton,
      hasControls: this.hasControls
    };
  }

  @dispatch()
  private hide(): IAction {
    return {
      type: actions.CLOSE_MODAL
    };
  }

  @dispatch()
  private animate(isVisible: boolean): IAction {
    return {
      type: actions.ANIMATE_MODAL,
      isVisible
    };
  }
}
