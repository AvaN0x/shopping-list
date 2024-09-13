import { Component, computed, inject, Signal } from '@angular/core';
import { HORIZONTAL_PAN_COMPONENT } from '../horizontal-pan.component';

@Component({
  templateUrl: './horizontal-pan-action.component.html',
  styleUrl: './horizontal-pan-action.component.scss',
  host: {
    '[style.width.px]': 'horizontalPan.horizontalActionsWidth()',
    '[class.triggerable]': 'canActionBeTriggered()',
  },
})
abstract class HorizontalPanActionComponent {
  horizontalPan = inject(HORIZONTAL_PAN_COMPONENT);

  abstract canActionBeTriggered: Signal<boolean>;
}

@Component({
  selector: 'app-horizontal-pan-action-left, [appHorizontalPanActionLeft]',
  templateUrl: './horizontal-pan-action.component.html',
  styleUrl: './horizontal-pan-action.component.scss',
  host: {
    '[class]': '"left"',
  },
})
export class HorizontalPanActionLeftComponent extends HorizontalPanActionComponent {
  canActionBeTriggered = this.horizontalPan.canLeftActionBeTriggered;
}

@Component({
  selector: 'app-horizontal-pan-action-right, [appHorizontalPanActionRight]',
  templateUrl: './horizontal-pan-action.component.html',
  styleUrl: './horizontal-pan-action.component.scss',
  host: {
    '[class]': '"right"',
  },
})
export class HorizontalPanActionRightComponent extends HorizontalPanActionComponent {
  canActionBeTriggered = this.horizontalPan.canRightActionBeTriggered;
}
