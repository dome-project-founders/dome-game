import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  formdata: any;
  ngOnInit() { 
     this.formdata = new FormGroup({ 
        email: new FormControl(),
     }); 
  } 
  onClickSubmit(data: any) {
  }
}
