import { Component, Input, OnChanges } from '@angular/core';
import { Lands } from 'src/model/Lands';
import { LocationService } from '../services/location.service';
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
    axios.get('http://localhost:3001/api/loot/' + data).then((result) => {
      this.actions = result.data;
      this.skill = data;
    });
  }
  actionClick(action: any) {
    this.odds = [];
    this.action = action;
    Object.entries(this.action.rarity[0]).forEach(entry => {
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
    this.loots = [];
    for (let i = 0; i < this.action.amount; i++) {
      let randomNumber = (Math.pow(10,14)*Math.random()*Math.random()%(100-0+1))+0;
      let buffer = 0;
      let actualDrop: any = null;
      this.odds.forEach((element: any) => {
        let tmp: any = element.odds*100;
        buffer += tmp;
        if(randomNumber <= buffer && !actualDrop) {
          actualDrop = element.rarity;
          this.loots.push(actualDrop);
        }
      });
    }
    const dialogRef = this.dialog.open(LootDialogComponent, {
      data: this.loots,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}

