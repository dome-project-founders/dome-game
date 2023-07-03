import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formdata: any;
  takenEmail: boolean = false;
  confirmPassword: boolean =  false;
  confirmEmail: boolean =  false;
  password: boolean =  false;
  email: boolean =  false;
  username: boolean =  false;

  constructor(private router: Router) { }

  ngOnInit() {
      if(sessionStorage.getItem('username')) {
        this.router.navigate(['/play']);
      }
      this.formdata = new FormGroup({ 
        username: new FormControl(),
        email: new FormControl(),
        confirmEmail: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
      });
  } 
  async onClickSubmit(data: any) {
    this.username = false;
    this.email = false;
    this.password = false;
    this.confirmEmail = false;
    this.confirmPassword = false;
    this.takenEmail = false;
    const mailReg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}","g");
    const passReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_\\-+=]).{8,20}$","g");
    await axios.get(environment.urlApi+'user/checkUsername/'+data.username).then((result) => {
      if(!(result.data == '')) {
        this.username = true;
      }
    });
    await axios.get(environment.urlApi+'user/checkEmail/'+data.email).then((result) => {
      if(!(result.data == '')) {
        this.takenEmail = true;
      }
    });
    if(!mailReg.test(data.email)) {
      this.email = true;
    }
    if(!(data.email == data.confirmEmail)) {
      this.confirmEmail = true;
    }
    if(!passReg.test(data.password)) {
      this.password = true;
    }
    if(!(data.password == data.confirmPassword)) {
      this.confirmPassword = true;
    }
    
    if(!this.username && !this.email && !this.password && !this.confirmEmail && !this.confirmPassword && !this.takenEmail) {
      let formData = {username : data.username,email: data.email, password: data.password}
      this.onRegister(formData)
    }
  }
  async onRegister(data : any) {
    let insertedUser: any;
    await axios.post(environment.urlApi+'user/',data);
    await axios.get(environment.urlApi+'user/checkUsername/'+data.username).then(async (result) => {
      insertedUser = {userId : result.data._id, username : result.data.username};
    })
    await axios.post(environment.urlApi+'char/',insertedUser);
    await axios.post(environment.urlApi+'inventory/',{userId : insertedUser.userId, items: []});
    this.router.navigate(['/login']);
  }
}
