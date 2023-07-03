import { getLocaleDirection } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { LocationService } from '../services/location/location.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  Land: any;
  Char: any;
  constructor(public locationService: LocationService, private router: Router) { 
  }

  async ngOnInit(): Promise<void> {
    if(!sessionStorage.getItem('username')) {
      this.router.navigate(['/login']);
    }
    this.Char = await this.locationService.getLocation();
    let svg = document.querySelectorAll("g g");
    let selected: any = null;

    axios.get(environment.urlApi+'land/'+this.Char.location).then((result) => {
          this.Land = result.data;
        })

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
        axios.get(environment.urlApi+'land/'+id).then((result) => {
          this.Land = result.data;
        })
        selected = event.target;
      });
    })

  }
  
}
