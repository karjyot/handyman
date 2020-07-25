import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from "./../services/login.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MustMatch } from './../helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  ForgetForm:FormGroup
  submitted = false;
  token:any
  constructor(private toastr: ToastrService,private router : Router, private activatedRoute: ActivatedRoute,private loginService: LoginService,private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.token = id;
    this.loginService.validateFogetToken({"token":id}).subscribe(
      res => {
       
        this.ngxService.stop()
      },
      err => {  
        this.router.navigateByUrl('/error');
        this.ngxService.stop()
      }
    );

    this.ForgetForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      c_password: ['', [Validators.required]],
    }, {
      validator: MustMatch('password', 'c_password')
  });
  }
  onSubmit(){

    this.submitted = true;
    if (this.ForgetForm.invalid) {
      this.toastr.error("Please fill the required information.")
              return;
        }
        this.ngxService.start()
        this.ForgetForm.value.token = this.token
        this.loginService.confirmNewPassword(this.ForgetForm.value).subscribe(
          res => {
            this.toastr.success('Password change succesfully..', 'Reset Password');
            this.ngxService.stop();
            this.router.navigateByUrl('/login');
          },
          err => {  
            this.ngxService.stop()
            this.toastr.error('something went wrong.', 'Error.');
          }
        );        
  }
  get f() { return this.ForgetForm.controls; }

}
