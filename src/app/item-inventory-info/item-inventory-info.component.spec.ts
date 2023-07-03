import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInventoryInfoComponent } from './item-inventory-info.component';

describe('ItemInventoryInfoComponent', () => {
  let component: ItemInventoryInfoComponent;
  let fixture: ComponentFixture<ItemInventoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInventoryInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInventoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
