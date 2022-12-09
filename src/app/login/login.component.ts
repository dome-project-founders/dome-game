import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  formdata: any;
  ngOnInit() { 
     this.formdata = new FormGroup({ 
        email: new FormControl(),
        password: new FormControl()
     }); 
  } 
  onClickSubmit(data: any) {
    console.log(data);
  }

}
