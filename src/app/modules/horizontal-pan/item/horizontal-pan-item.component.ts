import { Component, computed, inject } from '@angular/core';
import { HORIZONTAL_PAN_COMPONENT } from '../horizontal-pan.component';

@Component({
  selector: 'app-horizontal-pan-item, [appHorizontalPanItem]',
  templateUrl: './horizontal-pan-item.component.html',
  styleUrl: './horizontal-pan-item.component.scss',
  host: {
    '[style.left.px]': 'styleLeft()',
  },
})
export class HorizontalPanItemComponent {
  horizontalPan = inject(HORIZONTAL_PAN_COMPONENT);

  styleLeft = computed<number>(() => {
    const stoppingThreshold = this.horizontalPan.horizontalActionsWidth();
    return Math.min(
      stoppingThreshold,
      Math.max(-stoppingThreshold, this.horizontalPan.horizontalDiff())
    );
  });
}
