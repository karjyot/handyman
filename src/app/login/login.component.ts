import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SocialUser,SocialAuthService  } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
// import {
//   AuthService,
//   FacebookLoginProvider,
//   GoogleLoginProvider
// } from 'angular-6-social-login-v2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  submitted = false
  modal: BsModalRef | null;
  public loginData = { email:'',  password: '',rememberme:'' };
  constructor(private modalService: BsModalService,private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private authService: SocialAuthService) {}

  ngOnInit() {
   if(this.modal){
    this.modal.hide();
   } 
    if(this.loginService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }
    
    this.loginForm = this.formBuilder.group({ 
        email: ['', [Validators.required,Validators.email]],
        password:['',[Validators.required]],
        rememberme:[]
      });
      let cookies = String(this._cookieService.get('remember'));
    if(cookies == "true") {
      this.loginForm.controls['email'].setValue(this._cookieService.get('username'));
      this.loginForm.controls['password'].setValue(this._cookieService.get('password'));
      this.loginForm.controls['rememberme'].setValue(this._cookieService.get('remember'));
   
   }
    }

  login(){
    this.submitted = true;
    this._cookieService.set('username',this.loginForm.get('email').value);
    this._cookieService.set('password',this.loginForm.get('password').value);
    this._cookieService.set('remember',this.loginForm.get('rememberme').value);
    if (this.loginForm.invalid) {
      this.toastr.error("Please fill the required information.")
        return;
    }
    this.ngxService.start();
    this.loginService.login(this.loginForm.value).subscribe((result) => {
      this.loginService.setUserDetails(result['userData'])
      this.loginService.setToken(result['token']);
      this.router.navigateByUrl('/dashboard');
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Invalid username/password.');
      this.ngxService.stop();
     });
   
  } 

  socialLogin(socialPlatform : string){
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID
    }else if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID
    }

  this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData)
        let str = userData.name;
        var res = str.split(" ");
        var socialName = res[0];
       
        var name = socialName
        var email = userData.email
        var image = userData["photoUrl"]
        var password = userData.id
        let data = {"name":name,"email":email,"image":image,"password":password,"token":userData['token']}


        this.ngxService.start();
        this.loginService.registerSocial(data).subscribe(
          res => {
          if(res['success'] != 'firstTime'){
            this.loginService.setUserDetails(res['userDetails'][0])
            this.loginService.setToken(res['token']['token']);
            this.router.navigateByUrl('/dashboard')
          
            this.ngxService.stop();
          }else{
            this.ngxService.start()      
            this.loginService.firstTimeSocial(data).subscribe(
              res => {
              
                this.loginService.setUserDetails(res['userDetails'][0])
                this.loginService.setToken(res['token']['token']);
              this.router.navigateByUrl('/dashboard')
                this.ngxService.stop()         
              },
              err => {
              console.log(err)
              this.toastr.error('Network error occured.'); 
              this.ngxService.stop();
              }
            );
            this.ngxService.stop();
           
          }
                    
          
          },
          err => {
          console.log(err)
          this.toastr.error('You are already registerd with lvhslogistics.'); 
          this.ngxService.stop();
          }
        );
        
      }
    );
  }
  get f() { return this.loginForm.controls; }

}
