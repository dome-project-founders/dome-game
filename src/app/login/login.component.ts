import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  formdata: any;
  ngOnInit() { 
    if(sessionStorage.getItem('username')) {
      this.router.navigate(['/play']);
    }
     this.formdata = new FormGroup({ 
        email: new FormControl(),
        password: new FormControl()
     }); 
  } 
  async onClickSubmit(data: any) {
    //console.log(data);
    await axios.post(environment.urlApi+'user/login',data).then((res) => {
      //console.log(res);
      if(res.status = 200) {
        sessionStorage.setItem("username",res.data.username);
        sessionStorage.setItem("userId",res.data._id);
        this.router.navigate(['/play']);
      }
    });
  }

}
