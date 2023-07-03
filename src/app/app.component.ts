import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentURL: any;
  title = 'Dome';
  ngOnInit() {
    this.currentURL = window.location.href;
    //console.log(this.currentURL);
  }
}
