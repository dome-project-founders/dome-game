import { Component, Input, OnChanges } from '@angular/core';
import { Lands } from 'src/model/Lands';
import { LocationService } from '../services/location/location.service';
import axios from 'axios';
import { MatDialog } from '@angular/material/dialog';
import { LootDialogComponent } from '../loot-dialog/loot-dialog.component';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.scss']
})

export class AreaInfoComponent implements OnChanges {
  @Input() Land!: Lands;
  @Input() Char!: any;
  skill: any;
  actions: any;
  action: any;
  odds: any = [];
  loots: any = [];

  constructor(private locationService: LocationService, public dialog: MatDialog) { }

  async ngOnChanges(): Promise<void> {
  }

  ngOnInit(): void {
  }

  async travelClick(data: any) {
    this.locationService.setLocation(this.Land.land_id);
    this.Char = await this.locationService.getLocation();
    this.skill = null;
    this.action = null;
  }
  skillClick(data: any) {
    axios.get('http://localhost:3001/api/action').then((result) => {
      this.actions = result.data;
      this.actions .sort(function compare(a: { action: string; }, b: { action: string; }) {
        if (a.action < b.action)
           return -1;
        if (a.action > b.action )
           return 1;
        return 0;
      });
      this.skill = data;
      if(this.action) this.action.skill = "";
    });
  }
  actionClick(action: any) {
    this.odds = [];
    this.action = action;
    this.action.skill = this.skill;
    console.log(this.action);
    Object.entries(this.action.rarity).forEach(entry => {
      const [key, value] = entry;
      this.odds.push({rarity:key,odds:value});
    });
    let timeList= document.getElementsByClassName('time');
    for (let i = 0; i < timeList.length; i++) {
      timeList[i]?.classList.add('bg-beige');
    }
    let selected = document.getElementById(action.time);
    selected?.classList.remove("bg-beige");
    let target = document.getElementById('start');
    console.log(target);
    target?.scrollIntoView({behavior: 'smooth'});
  }
  startAction() {
    let rarity: String[] = [];
    this.odds.forEach((element: any) => {
      rarity.push(element.rarity);
    });
    axios.post('http://localhost:3001/api/item/lootTable',{
      data: {
        skill:this.skill,
        rarity: rarity
      }
    }).then((items: any) => {
      this.loots = [];
      for (let i = 0; i < this.action.amount; i++) {
        let randomNumber = (Math.pow(10,14)*Math.random()*Math.random()%(100-0+1))+0;
        let buffer = 0;
        let actualDrop: any = null;
        this.odds.forEach(async (element: any) => {
          let tmp: any = element.odds*100;
          buffer += tmp;
          if(randomNumber <= buffer && !actualDrop) {
            actualDrop = {};
            actualDrop.rarity = element.rarity;
            console.log("yes");
            let itemsToLoot: any = [];
            await items.data.forEach((item: any) => {
              if (item.rarity == actualDrop.rarity) itemsToLoot.push(item);
            });
            const randomIndex = Math.floor(Math.random() * itemsToLoot.length);
            actualDrop.item = itemsToLoot[randomIndex];
            this.loots.push(actualDrop);
          }
        });
      }
      console.log(this.loots);
      const dialogRef = this.dialog.open(LootDialogComponent, {
        data: this.loots,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
  
}

