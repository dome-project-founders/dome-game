import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  async getInventory() {
    let itemsData: any;
    let inventoryData: any;
    inventoryData = await axios.get(environment.urlApi+'inventory/'+sessionStorage.getItem("userId"));
    let itemIds: any[] = [];
    inventoryData.data.items.forEach((item: any) => {
      itemIds.push(item._id);
    });
    itemsData = await axios.post(environment.urlApi+'item/inventory',itemIds);
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
      //console.log(tmp);
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
        //console.log(finalInventory.find((item)=> item._id == idItem).count,idCount);
        finalInventory.find((item)=> item._id == idItem).count += idCount;
      } else {
        finalInventory.push(tmp);
      }
    });
    //console.log(finalInventory);
    await axios.post(environment.urlApi+'inventory/'+sessionStorage.getItem("userId"),finalInventory);
  }
}
