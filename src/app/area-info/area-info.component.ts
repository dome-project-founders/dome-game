import { Component, Input, OnChanges } from '@angular/core';
import { Lands } from 'src/model/Lands';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.scss']
})

export class AreaInfoComponent implements OnChanges {
  @Input() Land!: Lands; 
  @Input() Char!: any;

  constructor(private locationService: LocationService) { }

  async ngOnChanges(): Promise<void> {
  }

  ngOnInit(): void {
  }

  async travelClick(data: any) {
      this.locationService.setLocation(this.Land.land_id);
      this.Char = await this.locationService.getLocation();
    }
}
