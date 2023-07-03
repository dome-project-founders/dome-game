import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LootDialogComponent } from './loot-dialog.component';

describe('LootDialogComponent', () => {
  let component: LootDialogComponent;
  let fixture: ComponentFixture<LootDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LootDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LootDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
