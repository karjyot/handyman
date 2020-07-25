import { Component, OnInit,Inject,NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from "./../admin/services/admin.service";
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { SocialUser,SocialAuthService  } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-complete-booking',
  templateUrl: './complete-booking.component.html',
  styleUrls: ['./complete-booking.component.css']
})
export class CompleteBookingComponent implements OnInit {
  completeForm : FormGroup
  submitted = false
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  message: string;
  jobDetails:any;
  loginForm : FormGroup
  modal: BsModalRef | null;
  orderDetails:any
  constructor(private _zone: NgZone,private modalService: BsModalService,private _cookieService:CookieService,private loginService: LoginService,private adminService: AdminService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private authService: SocialAuthService) {}
  supportFee:any
  totalPrice:any
  ngOnInit(): void {
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
    this.jobDetails = this.loginService.getBookingDetails();
    this.orderDetails = this.loginService.getServiceDetails();
    let userDetails = this.loginService.getUserDetails();
    
    this.completeForm = this.formBuilder.group({ 
    //  email: ['', [Validators.required,Validators.email]],
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
      street:['',[Validators.required]],
      phone:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      month:['',[Validators.required,Validators.minLength(2)]],
      year:['',[Validators.required,Validators.minLength(2)]],
      card:['',[Validators.required]],
      cvc:['',[Validators.required]],
      apt:[''],
      terms:['',[Validators.required]]
    });
    if(userDetails){
      this.completeForm.controls["fname"].setValue(userDetails.name)
      this.completeForm.controls["lname"].setValue(userDetails.last_name)
      this.completeForm.controls["phone"].setValue(userDetails.phone)
    }
    this.totalPrice = this.orderDetails.finalPrice
   
    
  }
  booking(template){
    this.submitted = true;
    if (this.completeForm.invalid) {
      this.toastr.error("Please fill the required information.")
        return;
    }

    if(!this.loginService.getUserDetails()){
      
      this.modal= this.modalService.show(template, Object.assign({}, ));
   
      return;
    }

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      console.log(response);
      this.ngxService.start()
      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          let bookingID = this.makeid(5)
          this.loginService.setBookingID({bookingID:bookingID})
         let data = {
          jobDetails:this.jobDetails,
          orderDetails:this.orderDetails,
          addressDetails:this.completeForm.value,
          userID:this.loginService.getUserDetails().id,
          ookd:bookingID,
          token:response.id,
          totalPrice:this.totalPrice
         }
          this.loginService.order(data).subscribe((result) => {
          
            this.router.navigateByUrl('/confirmation')
            this.ngxService.stop();
           }, (err) => {
             this.toastr.error(err.error.message)
            this.ngxService.stop();
           });


        } else {
          this.ngxService.stop()
          if(response.error.code == 'incorrect_number'){
            this.completeForm.controls['card'].setErrors({'incorrect': true});
            this.toastr.error("Your card details are not correct")
          }
          else if(response.error.code == 'invalid_expiry_month'){
            this.completeForm.controls['month'].setErrors({'incorrect': true});
            this.toastr.error("Your card details are not correct")
          }
          else if(response.error.code == 'invalid_expiry_year'){
            this.completeForm.controls['year'].setErrors({'incorrect': true});
            this.toastr.error("Your card details are not correct")
          }
          else if(response.error.code == 'invalid_cvc'){
            this.completeForm.controls['cvc'].setErrors({'incorrect': true});
            this.toastr.error("Your card details are not correct")
          }else{
            this.toastr.error(response.error.message)
          }
         
        }
      });
    });
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  get f() { return this.completeForm.controls; }
  get fL() { return this.loginForm.controls; }
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
      this.booking('')
      this.modal.hide();
     // this.ngxService.stop();
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
            this.booking('')
            this.modal.hide()
            
            this.ngxService.stop();
          }else{
            this.ngxService.start()      
            this.loginService.firstTimeSocial(data).subscribe(
              res => {
              
                this.loginService.setUserDetails(res['userDetails'][0])
                this.loginService.setToken(res['token']['token']);
                this.booking('')
                this.modal.hide()
              
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
          this.toastr.error('You already registerd with lvhslogistics.'); 
          this.ngxService.stop();
          }
        );
        
      }
    );
  }

  register(){
    this.modal.hide()
    this.router.navigateByUrl('/register')
  }
}
