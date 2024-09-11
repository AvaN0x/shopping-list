import { Component, inject } from '@angular/core';
import { HORIZONTAL_PAN_COMPONENT } from '../horizontal-pan.component';

@Component({
  selector: 'app-horizontal-pan-action-left, [appHorizontalPanActionLeft]',
  templateUrl: './horizontal-pan-action.component.html',
  styleUrl: './horizontal-pan-action.component.scss',
  host: {
    '[style.width.px]': 'horizontalPan.horizontalActionsWidth()',
    '[class]': '"left"',
  },
})
export class HorizontalPanActionLeftComponent {
  horizontalPan = inject(HORIZONTAL_PAN_COMPONENT);
}

@Component({
  selector: 'app-horizontal-pan-action-right, [appHorizontalPanActionRight]',
  templateUrl: './horizontal-pan-action.component.html',
  styleUrl: './horizontal-pan-action.component.scss',
  host: {
    '[style.width.px]': 'horizontalPan.horizontalActionsWidth()',
    '[class]': '"right"',
  },
})
export class HorizontalPanActionRightComponent {
  horizontalPan = inject(HORIZONTAL_PAN_COMPONENT);
}
