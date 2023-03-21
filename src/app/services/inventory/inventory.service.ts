import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  async getInventory() {
    let itemsData: any;
    let inventoryData: any;
    inventoryData = await axios.get('http://localhost:3001/api/inventory/'+sessionStorage.getItem("userId"));
    console.log(inventoryData);
    let itemIds: any[] = [];
    inventoryData.data.items.forEach((item: any) => {
      console.log(item);
      itemIds.push(item._id);
    });
    console.log(itemIds);
    itemsData = await axios.post('http://localhost:3001/api/item/inventory',itemIds);
    console.log(itemsData);
    for (let i = 0; i < itemsData.data.length; i++) {
      itemsData.data[i].count = inventoryData.data.items[i].count;
    }
    return itemsData.data;
  }

  async setInventory(inventoryToSet: any) {
    let currentInventory = await this.getInventory();
    let finalInventory: any[] = [];
    currentInventory.forEach((item: any) => {
      let tmp: any = {}
      tmp._id = item._id;
      tmp.count = item.count;
      finalInventory.push(tmp);
    });
    inventoryToSet.forEach((item: any) => {
      let tmp: any = {}
      tmp._id = item._id;
      tmp.count = item.count;
      console.log(tmp);
      let isInInventory = false;
      let idCount: any;
      let idItem: any;
      finalInventory.forEach((item:any) => {
        if(tmp._id == item._id) {
          isInInventory = true;
          idItem = item._id
          idCount = tmp.count;
        }
      });
      if(isInInventory) {
        console.log(finalInventory.find((item)=> item._id == idItem).count,idCount);
        finalInventory.find((item)=> item._id == idItem).count += idCount;
      } else {
        finalInventory.push(tmp);
      }
    });
    console.log(finalInventory);
    await axios.post('http://localhost:3001/api/inventory/'+sessionStorage.getItem("userId"),finalInventory);
  }
}
