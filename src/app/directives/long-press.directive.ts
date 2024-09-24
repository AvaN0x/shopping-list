import { computed, Directive, Input, output, signal } from '@angular/core';

export type LongPressEndEvent = MouseEvent & {
  pressSuccess: boolean;
  pressDuration: number;
};

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
  /**
   * Duration in milliseconds to trigger the long press event
   *
   * @default 400
   */
  @Input() longPressDuration: number = 400;

  /**
   * Maximum movement in pixels to trigger the long press event
   *
   * @default 10
   */
  @Input() longPressMaxMoveThreshold: number = 10;
  longPress = output<MouseEvent>();
  longPressEnd = output<LongPressEndEvent>();

  private timer = signal<number | undefined>(undefined);
  private pressSuccess = signal<boolean>(false);
  private pressStartTime = signal<number>(0);

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
    this.startTimer(event);
  }
  pointerup(event: PointerEvent) {
    this.endTimer(event);
  }
  pointercancel(event: PointerEvent) {
    this.endTimer(event);
  }
  pointerout(event: PointerEvent) {
    this.endTimer(event);
  }
  pointerleave(event: PointerEvent) {
    this.endTimer(event);
  }
  pointermove(event: PointerEvent) {
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

    this.pressSuccess.set(false);
    this.pressStartTime.set(new Date().getTime());
    this.timer.set(
      setTimeout(() => {
        // Only allow if user moved below threshold
        if (
          Math.abs(this.horizontalDiff()) < this.longPressMaxMoveThreshold &&
          Math.abs(this.verticalDiff()) < this.longPressMaxMoveThreshold
        ) {
          this.pressSuccess.set(true);
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

      const pressSuccess = this.pressSuccess();
      const pressDuration = new Date().getTime() - this.pressStartTime();
      this.timer.set(undefined);
      this.pressStartTime.set(0);
      this.startMouseX.set(0);
      this.startMouseY.set(0);
      this.currentMouseX.set(0);
      this.currentMouseY.set(0);
      this.pressSuccess.set(false);
      this.longPressEnd.emit({ ...event, pressSuccess, pressDuration });
    }
  }
}
