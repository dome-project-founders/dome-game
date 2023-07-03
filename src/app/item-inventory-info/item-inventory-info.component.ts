import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-inventory-info',
  templateUrl: './item-inventory-info.component.html',
  styleUrls: ['./item-inventory-info.component.scss']
})
export class ItemInventoryInfoComponent {
  @Input() item: any;

  ngOnChanges() {
  }

  ngOnInit() {
  }
}
