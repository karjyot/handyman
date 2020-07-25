import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgotForm : FormGroup
  submitted = false
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  ngOnInit() {
    if(this.loginService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }
    this.forgotForm = this.formBuilder.group({ 
      email: ['', [Validators.required,Validators.email]],
    });
  }

  forgot(){
    this.submitted = true;
    if (this.forgotForm.invalid) {
      this.toastr.error("Please fill the required information.")
        return;
    }
    this.ngxService.start();
    let email = this.forgotForm.get('email').value
    this.loginService.forgotPassword({email:email}).subscribe((result:any) => {
      this.toastr.success("A verification link has been sent to your email id");
      this.ngxService.stop();
      },(err) => {
       try{
         let errMessage = err["error"]["message"];
         this.toastr.error(errMessage);
        }catch(e){
 
        }
        this.ngxService.stop();
       })

  }
  get f() { return this.forgotForm.controls; }

}
