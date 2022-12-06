import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Lands } from 'src/model/Lands';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.scss']
})

export class AreaInfoComponent implements OnChanges {
  @Input() Land!: Lands; 

  constructor() { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

}
