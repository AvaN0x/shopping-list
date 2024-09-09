import { computed, Directive, Input, output, signal } from '@angular/core';

@Directive({
  selector: '[appHorizontalPan]',
  exportAs: 'appHorizontalPan',
  standalone: true,
  host: {
    '(pointerdown)': 'pointerdown($event)',

    '(pointerup)': 'pointerup($event)',
    // For some reason pointerup is not triggered
    '(mouseup)': 'mouseup($event)',
    '(touchup)': 'touchup($event)',

    '(pointercancel)': 'pointercancel($event)',
    '(pointerout)': 'pointerout($event)',
    '(pointerleave)': 'pointerleave($event)',

    '(pointermove)': 'pointermove($event)',

    '[class.panning]': 'panning()',

    '[style.touch-action]': '"pan-y"',
  },
})
export class HorizontalPanDirective {
  @Input() horizontalPanHorizontalMinThreshold: number = 50;
  horizontalPanRight = output<PointerEvent | MouseEvent | TouchEvent>();
  horizontalPanLeft = output<PointerEvent | MouseEvent | TouchEvent>();

  private panPointerId = signal<number | undefined>(undefined);
  private startMouseX = signal<number>(0);
  private currentMouseX = signal<number>(0);

  panning = computed<boolean>(() => this.panPointerId() !== undefined);
  horizontalDiff = computed<number>(
    () => this.currentMouseX() - this.startMouseX()
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
  touchup(event: TouchEvent) {
    this.endPan(event);
  }

  pointercancel(event: PointerEvent) {
    this.endPan(event);
  }
  pointerout(event: PointerEvent) {
    this.endPan(event);
  }
  pointerleave(event: PointerEvent) {
    this.endPan(event);
  }

  pointermove(event: PointerEvent) {
    this.move(event);
  }

  move(event: PointerEvent) {
    if (this.panPointerId()) {
      this.currentMouseX.set(event.clientX);
    }
  }
  startPan(event: PointerEvent) {
    // Save start position mouse/touch position
    this.startMouseX.set(event.clientX);
    this.currentMouseX.set(event.clientX);

    this.panPointerId.set(event.pointerId);
  }

  endPan(event: PointerEvent | MouseEvent | TouchEvent) {
    if (this.panPointerId()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      console.log('directional', this.horizontalDiff());
      if (
        Math.abs(this.horizontalDiff()) >
        this.horizontalPanHorizontalMinThreshold
      ) {
        if (this.horizontalDiff() > 0) {
          console.log('right');
          this.horizontalPanRight.emit(event);
        } else {
          console.log('left');
          this.horizontalPanLeft.emit(event);
        }
      }

      this.panPointerId.set(undefined);
      this.startMouseX.set(0);
      this.currentMouseX.set(0);
    }
  }
}
