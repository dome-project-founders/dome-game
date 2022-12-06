import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  Land: any;
  constructor() { }

  ngOnInit(): void {
    let svg = document.querySelector("g");
    let selected: any = null;
    console.log(svg);
    svg?.addEventListener('mouseover', (event: any) => {
      svg?.appendChild(event.target);
      if(selected != null) {
        svg?.appendChild(selected);
      }
    });
    svg?.addEventListener('click', (event: any) => {
      let paths = document.querySelectorAll("path");
      paths.forEach(path => {
        path.classList.remove("selected");
      })
      event.target.classList.add("selected");
      console.log(event.target.id);
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
