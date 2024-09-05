import { TestBed } from '@angular/core/testing';

import { ShoppingStoresService } from './shopping-stores.service';

describe('ShoppingStoresService', () => {
  let service: ShoppingStoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingStoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
