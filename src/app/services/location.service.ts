import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  Char: any;

  async getLocation() {
    //sessionStorage.setItem("username","Panda");
    const response = await axios.get('http://localhost:3001/api/char/'+sessionStorage.getItem("username"));
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
    let username = sessionStorage.getItem("username");
    let location = {location: data}
    const response = await axios.put('http://localhost:3001/api/char/location/'+username, location);
  }
}
