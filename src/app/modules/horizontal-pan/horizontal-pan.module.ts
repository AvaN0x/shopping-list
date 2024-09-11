import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalPanComponent } from './horizontal-pan.component';
import { HorizontalPanItemComponent } from './item/horizontal-pan-item.component';
import {
  HorizontalPanActionLeftComponent,
  HorizontalPanActionRightComponent,
} from './action/horizontal-pan-action.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HorizontalPanComponent,
    HorizontalPanItemComponent,
    HorizontalPanActionLeftComponent,
    HorizontalPanActionRightComponent,
  ],
  exports: [
    HorizontalPanComponent,
    HorizontalPanItemComponent,
    HorizontalPanActionLeftComponent,
    HorizontalPanActionRightComponent,
  ],
})
export class HorizontalPanModule {}
