import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from "./../services/login.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MustMatch } from './../helpers/must-match.validator';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent implements OnInit {
  ForgetForm:FormGroup
  submitted = false;
  isLogin:any
  constructor(private toastr: ToastrService,private router : Router, private activatedRoute: ActivatedRoute,private loginService: LoginService,private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.ForgetForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      c_password: ['', [Validators.required]],
    }, {
      validator: MustMatch('password', 'c_password')
  });
  }
  onSubmit(){
    this.ForgetForm.value.id = this.loginService.getUserDetails().id
    this.submitted = true;
    if (this.ForgetForm.invalid) {
      this.toastr.error("Please fill the required information.")
              return;
        }
        this.ngxService.start()
        this.loginService.changeUserPassword(this.ForgetForm.value).subscribe(
          res => {
            this.toastr.success('Password change succesfully');
            this.ngxService.stop();
            this.ForgetForm.reset();
            this.router.navigateByUrl('/login');
          },
          err => {  
            this.ngxService.stop()
            this.toastr.error('something went wrong.', 'Error.');
          }
        );        
  }
  get f() { return this.ForgetForm.controls; }
  logout(){
    this.loginService.deleteToken();
    this.loginService.deleteUserDetails();
    this.isLogin = false;
    this.loginService.sendLogout(false); 
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/"])); 
   }

}


