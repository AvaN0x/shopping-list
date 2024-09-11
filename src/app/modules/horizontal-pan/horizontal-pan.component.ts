import {
  Component,
  computed,
  Directive,
  HostListener,
  inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';

export const HORIZONTAL_PAN_COMPONENT =
  new InjectionToken<HorizontalPanComponent>('HorizontalPanComponent');

@Component({
  selector: 'app-horizontal-pan, [appHorizontalPan]',
  templateUrl: './horizontal-pan.component.html',
  styleUrl: './horizontal-pan.component.scss',
  providers: [
    { provide: HORIZONTAL_PAN_COMPONENT, useExisting: HorizontalPanComponent },
  ],
  host: {
    '(pointerdown)': 'pointerdown($event)',

    '(document:pointerup)': 'pointerup($event)',
    // For some reason pointerup is not triggered
    '(document:mouseup)': 'mouseup($event)',
    '(document:touchend)': 'touchend($event)',

    '(pointercancel)': 'pointercancel($event)',
    // '(pointerout)': 'pointerout($event)',
    // '(pointerleave)': 'pointerleave($event)',

    '(document:pointermove)': 'pointermove($event)',
    '(document:touchmove)': 'touchmove($event)',

    '[class.panning]': 'panning()',
  },
})
export class HorizontalPanComponent {
  // TODO: Issue on vertical scroll mobile

  @Input() horizontalPanHorizontalMinThreshold: number = 50;
  horizontalPanRight = output<PointerEvent | MouseEvent | TouchEvent>();
  horizontalPanLeft = output<PointerEvent | MouseEvent | TouchEvent>();

  panning = signal<boolean>(false);
  private startMouseX = signal<number>(0);
  private currentMouseX = signal<number>(0);

  horizontalDiff = computed<number>(
    () => this.currentMouseX() - this.startMouseX()
  );
  horizontalActionsWidth = computed<number>(
    () => this.horizontalPanHorizontalMinThreshold * 1.2
  );

  pointerdown(event: PointerEvent) {
    this.startPan(event);
  }

  pointerup(event: PointerEvent) {
    this.endPan(event);
  }
  mouseup(event: MouseEvent) {
    this.endPan(event);
  }
  touchend(event: TouchEvent) {
    this.endPan(event);
  }

  pointercancel(event: PointerEvent) {
    this.endPan(event);
  }
  // pointerout(event: PointerEvent) {
  //   this.endPan(event);
  // }
  // pointerleave(event: PointerEvent) {
  //   this.endPan(event);
  // }

  pointermove(event: PointerEvent) {
    this.move(event);
  }
  touchmove(event: TouchEvent) {
    this.move(event);
  }

  startPan(event: PointerEvent | MouseEvent | TouchEvent) {
    // Save start position mouse/touch position
    this.startMouseX.set(
      'clientX' in event ? event.clientX : event.touches?.[0].clientX
    );
    this.currentMouseX.set(
      'clientX' in event ? event.clientX : event.touches?.[0].clientX
    );

    this.panning.set(true);
  }
  move(event: PointerEvent | MouseEvent | TouchEvent) {
    if (this.panning()) {
      this.currentMouseX.set(
        'clientX' in event ? event.clientX : event.touches?.[0].clientX
      );
    }
  }
  endPan(event: PointerEvent | MouseEvent | TouchEvent) {
    if (this.panning()) {
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (
        Math.abs(this.horizontalDiff()) >
        this.horizontalPanHorizontalMinThreshold
      ) {
        if (this.horizontalDiff() > 0) {
          this.horizontalPanRight.emit(event);
        } else {
          this.horizontalPanLeft.emit(event);
        }
      }

      this.panning.set(false);
      this.startMouseX.set(0);
      this.currentMouseX.set(0);
    }
  }
}
