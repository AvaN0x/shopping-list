import { computed, Directive, Input, output, signal } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
  exportAs: 'appLongPress',
  standalone: true,
  host: {
    '(pointerdown)': 'pointerdown($event)',
    '(pointerup)': 'pointerup($event)',
    '(pointercancel)': 'pointercancel($event)',
    '(pointerout)': 'pointerout($event)',
    '(pointerleave)': 'pointerleave($event)',
    '(pointermove)': 'pointermove($event)',

    '[class.holding]': 'holding()',
  },
})
export class LongPressDirective {
  @Input() longPressDuration: number = 500; // Default duration in milliseconds
  @Input() longPressMaxMoveThreshold: number = 10;
  longPress = output<MouseEvent>();
  longPressEnd = output<MouseEvent>();

  private timer = signal<number | undefined>(undefined);
  private startMouseX = signal<number>(0);
  private startMouseY = signal<number>(0);
  private currentMouseX = signal<number>(0);
  private currentMouseY = signal<number>(0);

  holding = computed<boolean>(() => this.timer() !== undefined);
  horizontalDiff = computed<number>(
    () => this.currentMouseX() - this.startMouseX()
  );
  verticalDiff = computed<number>(
    () => this.currentMouseY() - this.startMouseY()
  );

  pointerdown(event: PointerEvent) {
    // console.log('###########################################################');
    // console.log('pointerdown', event.pointerId);

    this.startTimer(event);
  }
  pointerup(event: PointerEvent) {
    // console.log('pointerup', event.pointerId);

    this.endTimer(event);
  }
  pointercancel(event: PointerEvent) {
    // console.log('pointercancel', event.pointerId);

    this.endTimer(event);
  }
  pointerout(event: PointerEvent) {
    // console.log('pointerout', event.pointerId);

    this.endTimer(event);
  }
  pointerleave(event: PointerEvent) {
    // console.log('pointerleave', event.pointerId);

    this.endTimer(event);
  }
  pointermove(event: PointerEvent) {
    // console.log('pointermove', event.pointerId);

    this.move(event);
  }

  move(event: MouseEvent) {
    if (this.timer()) {
      this.currentMouseX.set(event.clientX);
      this.currentMouseY.set(event.clientY);
    }
  }
  startTimer(event: MouseEvent) {
    if (this.timer) {
      clearTimeout(this.timer());
    }

    // Save start position mouse/touch position
    this.startMouseX.set(event.clientX);
    this.startMouseY.set(event.clientY);

    this.currentMouseX.set(event.clientX);
    this.currentMouseY.set(event.clientY);

    this.timer.set(
      setTimeout(() => {
        // Only allow if user moved below threshold
        if (
          Math.abs(this.horizontalDiff()) < this.longPressMaxMoveThreshold &&
          Math.abs(this.verticalDiff()) < this.longPressMaxMoveThreshold
        ) {
          this.longPress.emit(event);
        }
      }, this.longPressDuration)
    );
  }

  endTimer(event: MouseEvent) {
    if (this.timer()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      clearTimeout(this.timer());

      this.timer.set(undefined);
      this.startMouseX.set(0);
      this.startMouseY.set(0);
      this.currentMouseX.set(0);
      this.currentMouseY.set(0);
      this.longPressEnd.emit(event);
    }
  }
}
