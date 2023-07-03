import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { InventoryService } from '../services/inventory/inventory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loot-dialog',
  templateUrl: './loot-dialog.component.html',
  styleUrls: ['./loot-dialog.component.scss']
})
export class LootDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LootDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryService: InventoryService
  ) {}
  loots = this.data;
  lootColors = [];

  async ngOnInit(): Promise<void> {
    let loots: any[] = [];
    this.data.forEach((element: any) => {
      //console.log(this.data);
      loots.push(element.item._id);
    });
    let itemsLooted = await axios.post(environment.urlApi+'item/inventory',loots);
    let counts: any = {}
    loots.forEach(function(x) {
      counts[x] = (counts[x] || 0) +1;
    });
    let keyNames = Object.keys(counts);
    keyNames.forEach((key: any) => {
      itemsLooted.data.find((item: any) => item._id == key).count = counts[key];
    });
    this.inventoryService.setInventory(itemsLooted.data);
  }
  closeModal() {
    this.dialogRef.close();
  }

}
