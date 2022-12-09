import { getLocaleDirection } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  Land: any;
  Char: any;
  constructor(public locationService: LocationService) { }

  async ngOnInit(): Promise<void> {
    this.Char = await this.locationService.getLocation();

    let svg = document.querySelector("g");
    let selected: any = null;
    svg?.addEventListener('mouseover', (event: any) => {
      svg?.appendChild(event.target);
      if(selected != null) {
        svg?.appendChild(selected);
      }
    });

    //Event onClick land
    svg?.addEventListener('click', (event: any) => {
      let paths = document.querySelectorAll("path");
      paths.forEach(path => {
        path.classList.remove("selected");
      })
      event.target.classList.add("selected");
      let id = event.target.id.toString();
      axios.get('http://localhost:3001/api/land/'+id).then((result) => {
        this.Land = result.data;
      })
      selected = event.target;
      if(selected != null) {
        svg?.appendChild(selected);
      }
    });

  }
}
