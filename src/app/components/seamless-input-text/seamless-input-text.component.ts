import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import debounce from 'lodash/debounce';
import type { Subscription } from 'rxjs';

@Component({
  selector: 'app-seamless-input-text',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './seamless-input-text.component.html',
  styleUrl: './seamless-input-text.component.scss',
})
export class SeamlessInputTextComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input({ required: true }) defaultValue!: string;
  value = new FormControl('');
  subscription: Subscription;

  input = viewChild<ElementRef<HTMLInputElement>>('input');

  onEnter = output<void>();
  onValueChange = output<string>();
  onBlur = output<FocusEvent>();

  constructor() {
    this.subscription = this.value.valueChanges.subscribe(this.updateDebounce);
  }

  updateDebounce = debounce(() => {
    this.onValueChange.emit(this.value.value ?? '');
  }, 1000);

  ngOnInit(): void {
    this.value.setValue(this.defaultValue);
  }

  ngAfterViewInit(): void {
    this.input()?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  _onBlur(event: FocusEvent): void {
    this.updateDebounce.flush();
    this.onBlur.emit(event);
  }

  _onEnter(_event: Event): void {
    this.updateDebounce.flush();
    this.onEnter.emit();
  }
}
