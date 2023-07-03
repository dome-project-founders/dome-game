import { Component, OnChanges } from '@angular/core';
import { InventoryService } from '../services/inventory/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnChanges {
  itemsData: any;
  itemInfo: any;
  constructor(private inventoryService: InventoryService, private router: Router) {
   }

  async ngOnChanges(): Promise<void> {
  }
  async ngOnInit(): Promise<void> {
    if(!sessionStorage.getItem('username')) {
      this.router.navigate(['/login']);
    }
    this.itemsData = await this.inventoryService.getInventory();
  }
  getItemInfo(item: any) {
    this.itemInfo = item;
  }
}
