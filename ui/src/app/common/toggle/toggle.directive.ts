import { Directive, Input, HostListener, ElementRef, AfterContentInit, Renderer, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState, IAction } from '~schema';
import actions from '~app/app.actions';

@Directive({
  selector: '[lkToggle]'
})
export class ToggleDirective implements AfterContentInit, OnDestroy {
  @Input()
  public lkToggle: string;
  @Input()
  public autoClose = true;
  private state = false;
  private unregisterDocumentClickListener: Function;
  private unregisterWindowResizeListener: Function;

  constructor(
    private store: NgRedux<IAppState>,
    private _el: ElementRef,
    private renderer: Renderer
  ) { }

  ngAfterContentInit() {
    if (this.autoClose) {
      this.unregisterDocumentClickListener = this.renderer.listenGlobal('document', 'click', onDocumentClick.bind(this));
      this.unregisterWindowResizeListener = this.renderer.listenGlobal('window', 'resize', onWindowResize.bind(this));
    }

    function onDocumentClick(event: MouseEvent) {
      if (!this._el.nativeElement.contains(event.target)) {
        this.toggle(false);
      }
    }

    function onWindowResize() {
      this.toggle(false);
    }
  }

  ngOnDestroy() {
    this.unregisterDocumentClickListener();
    this.unregisterWindowResizeListener();
  }

  @HostListener('click')
  private toggle(state: boolean): void {
    if (state === undefined) {
      state = !this.state;
    }

    if (state !== this.state) {
      this.state = state;

      this.store.dispatch({
        type: actions.TOGGLE,
        target: this.lkToggle,
        toggleState: this.state
      });
    }
  }
}
