import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef, ScrollDispatcher } from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Subscription, fromEvent, merge } from 'rxjs';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  @Input() content = '';
  @Input() htmlContent = '';
  @Input() positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetX: 0,
      offsetY: -4,
    },
  ];
  @Input() contentClass = '';

  private _show = false;
  private _overlayRef: OverlayRef | null = null;
  private _portal: DomPortal | null = null;
  private subscriptions: Subscription[] = [];
  private showSubscriptions: Subscription[] = [];

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor: FocusMonitor,
    private _scrollDispatcher: ScrollDispatcher
  ) {}

  ngAfterViewInit() {
    // toggle tooltip when focusing
    this.subscriptions.push(
      this._focusMonitor.monitor(this._elementRef).subscribe((origin: FocusOrigin) => {
        if (!origin) {
          setTimeout(() => this.hide());
        } else if (origin === 'keyboard') {
          setTimeout(() => this.show());
        }
      })
    );

    // toggle tooltip when mouse entering/existing
    const mouseEnterListener = () => this.show();
    const mouseLeaveListener = () => this.hide();
    // hide the tooltip when the user hits the "Enter" key
    const enterKeyListener = (event: KeyboardEvent) => {
      if (event.keyCode === 13 || event.key === 'Enter') {
        this.hide();
      }
    };
    this._elementRef.nativeElement.addEventListener('mouseenter', mouseEnterListener);
    this._elementRef.nativeElement.addEventListener('mouseleave', mouseLeaveListener);
    // mobile view tab event
    this._elementRef.nativeElement.addEventListener('touchstart', mouseEnterListener);
    this._elementRef.nativeElement.addEventListener('touchend', mouseLeaveListener);
    this._elementRef.nativeElement.addEventListener('keydown', enterKeyListener);

    this.subscriptions.push({
      unsubscribe: () => {
        this._elementRef.nativeElement.removeEventListener('mouseenter', mouseEnterListener);
        this._elementRef.nativeElement.removeEventListener('mouseleave', mouseLeaveListener);
        this._elementRef.nativeElement.removeEventListener('touchstart', mouseEnterListener);
        this._elementRef.nativeElement.removeEventListener('touchend', mouseLeaveListener);
        this._elementRef.nativeElement.removeEventListener('keydown', enterKeyListener);
      },
    } as Subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  private show(): void {
    if (this._show || !(this.content || this.htmlContent)) {
      return;
    }

    if (this._overlayRef?.hasAttached()) {
      this._overlayRef.detach();
    }

    this._show = true;

    // create an overlay
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withFlexibleDimensions(true)
      .withScrollableContainers(
        this._scrollDispatcher.getAncestorScrollContainers(this._elementRef)
      )
      .withPositions(this.positions)
      .withViewportMargin(16);

    this._overlayRef = this._overlay.create({
      positionStrategy,
    });

    // attach content to the overlay
    const contentEl: HTMLElement = document.createElement('div');
    if (this.content) {
      contentEl.textContent = this.content;
    } else if (this.htmlContent) {
      contentEl.innerHTML = this.htmlContent;
    }
    contentEl.style.pointerEvents = 'none';
    if (this.contentClass) contentEl.classList.add('tooltip-content', this.contentClass);
    else contentEl.classList.add('tooltip-content');
    this.addArrowPositionClass(contentEl);
    this._elementRef.nativeElement.parentElement?.insertBefore(
      contentEl,
      this._elementRef.nativeElement
    );
    this._portal = new DomPortal(contentEl);
    this._overlayRef.attach(this._portal);

    this.showSubscriptions.push(
      this._overlayRef.keydownEvents().subscribe((event) => event.key === 'Escape' && this.hide())
    );

    // hide when scrolling
    const targets: EventTarget[] = [window, this._elementRef.nativeElement];
    let el: HTMLElement = this._elementRef.nativeElement;
    while (el.parentElement) {
      el = el.parentElement;
      targets.push(el);
    }

    const scroll = merge(...targets.map((el) => fromEvent(el, 'scroll')));
    this.showSubscriptions.push(scroll.subscribe(() => this.hide()));
  }

  private hide(): void {
    if (!this._show) {
      return;
    }

    this._show = false;
    this._overlayRef?.detach();
    this._portal?.element.remove();
    this.showSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  private addArrowPositionClass(el: HTMLElement): void {
    el.classList.add(`arrow-${this.positions[0].overlayX}-${this.positions[0].overlayY}`);
  }
}
