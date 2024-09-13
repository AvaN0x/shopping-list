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
  /**
   * The distance needed to be able to trigger the action
   */
  @Input() horizontalPanActionThreshold: number = 50;
  /**
   * The distance needed before the pan horizontal diff is considered
   */
  @Input() horizontalPanDeductedDistance: number = 20;

  horizontalPanRight = output<PointerEvent | MouseEvent | TouchEvent>();
  horizontalPanLeft = output<PointerEvent | MouseEvent | TouchEvent>();

  panning = signal<boolean>(false);
  private startMouseX = signal<number>(0);
  private currentMouseX = signal<number>(0);

  horizontalDiff = computed<number>(() => {
    // Get the difference between the start and current mouse position
    const diff = this.currentMouseX() - this.startMouseX();
    // Get the multiplier to restore the original direction
    const negativeMultiplier = diff > 0 ? 1 : -1;
    // Return the absolute difference minus the deducted distance
    return (
      Math.max(0, Math.abs(diff) - this.horizontalPanDeductedDistance) *
      negativeMultiplier
    );
  });
  horizontalActionsWidth = computed<number>(
    () => this.horizontalPanActionThreshold * 1.2
  );
  canLeftActionBeTriggered = computed<boolean>(
    () => this.horizontalDiff() >= this.horizontalPanActionThreshold
  );
  canRightActionBeTriggered = computed<boolean>(
    () => this.horizontalDiff() <= -this.horizontalPanActionThreshold
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

      if (this.canLeftActionBeTriggered()) {
        this.horizontalPanLeft.emit(event);
      } else if (this.canRightActionBeTriggered()) {
        this.horizontalPanRight.emit(event);
      }

      this.panning.set(false);
      this.startMouseX.set(0);
      this.currentMouseX.set(0);
    }
  }
}
