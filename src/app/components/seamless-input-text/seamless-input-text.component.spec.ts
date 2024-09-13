import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeamlessInputTextComponent } from './seamless-input-text.component';

describe('SeamlessInputTextComponent', () => {
  let component: SeamlessInputTextComponent;
  let fixture: ComponentFixture<SeamlessInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeamlessInputTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeamlessInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
