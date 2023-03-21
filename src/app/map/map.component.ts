import { getLocaleDirection } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  Land: any;
  Char: any;
  constructor(public locationService: LocationService) { 
    document.body.className = "bodybg";
  }

  async ngOnInit(): Promise<void> {
    this.Char = await this.locationService.getLocation();
    let svg = document.querySelectorAll("g g");
    let selected: any = null;

    //Event onClick land
    svg?.forEach(svg => {
      svg.addEventListener('click', (event: any) => {
        let paths = document.querySelectorAll("g g path");
        let circles = document.querySelectorAll("g g circle");
        paths.forEach(path => {
          path.classList.remove("selected");
        })
        circles.forEach(circle => {
          circle.classList.remove("selected");
        })
        event.target.classList.add("selected");
        let id = event.target.id.toString();
        axios.get('http://localhost:3001/api/land/'+id).then((result) => {
          this.Land = result.data;
        })
        selected = event.target;
      });
    })

  }
  
}
