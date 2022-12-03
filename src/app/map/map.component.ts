import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

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
      selected = event.target;
      if(selected != null) {
        svg?.appendChild(selected);
      }
    });
  }

}
