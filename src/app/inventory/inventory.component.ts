import { Component, OnChanges } from '@angular/core';
import { InventoryService } from '../services/inventory/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnChanges {
  itemsData: any;
  constructor(private inventoryService: InventoryService) {
   }

  async ngOnChanges(): Promise<void> {
  }
  async ngOnInit(): Promise<void> {
    this.itemsData = await this.inventoryService.getInventory();
    console.log(this.itemsData);
  }
}
