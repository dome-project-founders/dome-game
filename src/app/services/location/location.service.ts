import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  Char: any;

  async getLocation() {
    const response = await axios.get(environment.urlApi+'char/'+sessionStorage.getItem("userId"));
    let previousLocation = document.getElementsByClassName('location');
    for (let i = 0; i < previousLocation.length; i++) {
      const element = previousLocation[i];
      element.classList.remove('location');
    }

    let location = document.getElementById(response.data.location);
        location!.classList.add("location");
    return response.data;
  }

  async setLocation(data: any) {
    let userId = sessionStorage.getItem("userId");
    let location = {location: data}
    const response = await axios.put(environment.urlApi+'char/location/'+userId, location);
  }
}
