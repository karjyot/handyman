import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router,NavigationEnd,ActivatedRoute  } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from "./../admin/services/admin.service";
import moment = require('moment');
import { forkJoin } from 'rxjs';

import { SocialUser,SocialAuthService  } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  bookingForm : FormGroup
  loginForm:FormGroup
  QuoteForm:FormGroup
  submitted = false
  subCategoryDetails:any;
  times:any;
  modal: BsModalRef | null;
  totalPrice:any
  supportFee:any
  home:any
  constructor(private _cookieService:CookieService,private activatedRoute: ActivatedRoute,private modalService: BsModalService,private adminService:AdminService,private router : Router,private loginService: LoginService,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private authService: SocialAuthService) {}
 min = new Date();
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ 
      email: ['', [Validators.required,Validators.email]],
      password:['',[Validators.required]],
      rememberme:[]
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    let userDetails = this.loginService.getUserDetails();
    this.bookingForm = this.formBuilder.group({ 
      email: ['', [Validators.required,Validators.email]],
      zip:['',[Validators.required]],
      date:['',[Validators.required]],
      about:['',[Validators.required]],
      phone:[''],
      hours:[''],
      time:['']
    });

    this.QuoteForm = this.formBuilder.group({ 
      email: ['', [Validators.required,Validators.email]],
     // zip:['',[Validators.required]],
      //date:['',[Validators.required]],
      about:['',[Validators.required]],
      phone:['',[Validators.required]],
      hours:[''],
      //time:['']
    });
    this.ngxService.start();
    // this.adminService.getSupportFee().subscribe((result) => {
           
      
    //   this.ngxService.stop();
    //  }, (err) => {
    //    this.toastr.error(err.error.message)
    //   this.ngxService.stop();
    //  });
    let serviceName = this.activatedRoute.snapshot.paramMap.get('id').replace(/-/g, ' ');
    console.log(serviceName)
    let id = this.activatedRoute.snapshot.paramMap.get('serviceId');
     let q1 = this.adminService.getSupportFee();
     let q2 = this.loginService.getHomeContent();
     let q3 = this.loginService.getsubcategoryDetails(serviceName)
     forkJoin([q1, q2, q3]).subscribe(data => {
      let supportFee = data[0]['success'][0].fee;
      this.supportFee = data[0]['success'][0].fee;
      this.subCategoryDetails = data[2]['success'][0];
      let totalPrice = parseFloat(supportFee) + parseFloat(this.subCategoryDetails.price)
      this.totalPrice = totalPrice;
     
      this.home =  data[1]["success"][0]
      this.loginService.setBookingDetails(this.subCategoryDetails)
      this.ngxService.stop();

    });



   this.times =  this.listofTimes();
    this.bookingForm.controls["hours"].setValue(2)
    this.bookingForm.controls["time"].setValue("03:00PM")
    if(userDetails){
      this.bookingForm.controls["email"].setValue(userDetails.email)
     
    }

  }

  book(template,template1){
    this.submitted = true
    if(!this.bookingForm.valid){
      this.toastr.error("Please enter the valid required fields.")
      return;
    }
    if(this.bookingForm.value.hours  == 2 || this.bookingForm.value.hours  == 3 || this.bookingForm.value.hours  == 4){
      this.QuoteForm.controls["hours"].setValue(this.bookingForm.value.hours)
      this.QuoteForm.controls["email"].setValue(this.bookingForm.value.email)
      this.QuoteForm.controls["about"].setValue(this.bookingForm.value.about)
     // this.QuoteForm.controls["phone"].setValue(" ")
    if(!this.loginService.getUserDetails()){
      this.modal= this.modalService.show(template1, Object.assign({}, ));
      return
    }
      this.modal= this.modalService.show(template, Object.assign({}, ));
    }else{
     // if(this.loginService.getUserDetails()){
       // this.bookingForm.value.date = this.bookingForm.value.date.toJSON().slice(0, 10);
        this.bookingForm.value.date = moment(this.bookingForm.value.date).format( 'YYYY-MM-DD' ) 
        this.bookingForm.value.finalPrice = this.totalPrice
        this.bookingForm.value.support = this.supportFee
        this.loginService.setServiceDetails(this.bookingForm.value)
        this.router.navigateByUrl('/complete-booking')
      // }else{
      //   this.toastr.error("Please login to complete your booking.")
      // }
      
    }
    
  }
  listofTimes(){
    var x = 30; //minutes interval
    var times = []; // time array
    var tt = 0; // start time
    var ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for (var i=0;tt<24*60; i++) {
      var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
      var mm = (tt%60); // getting minutes of the hour in 0-55 format
      times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }

    return times;
  }
  get f() { return this.bookingForm.controls; }
  get fq() { return this.QuoteForm.controls; }

  quote(){
   
    if(!this.QuoteForm.valid){

      return
    }
    this.ngxService.start()
    this.QuoteForm.value.date = moment(this.bookingForm.value.date).format( 'YYYY-MM-DD' ) 
    this.QuoteForm.value.time = this.bookingForm.value.time
    this.QuoteForm.value.userID = this.loginService.getUserDetails().id
    this.QuoteForm.value.job = this.loginService.getBookingDetails().name;
    this.QuoteForm.value.zip = this.bookingForm.value.zip 
    this.loginService.quoteJob(this.QuoteForm.value).subscribe(
      res => {
       this.toastr.success("Your request sent successfully.");
       this.router.navigateByUrl('/dashboard');
       this.modal.hide();
        this.ngxService.stop()
      },
      err => {  
       // this.router.navigateByUrl('/error');
        this.ngxService.stop()
      }
    );
  }

  validatePinCode(){
   // console.log({zip:this.QuoteForm.value.zip})
    this.loginService.validatePin({zip:this.bookingForm.value.zip}).subscribe(
      res => {
        console.log(res)
      //  this.toastr.success("Your request sent successfully.");
      //  this.modal.hide();
      //   this.ngxService.stop()
      },
      err => {  
        this.bookingForm.controls['zip'].setErrors({ 'invalid': true });
       // this.router.navigateByUrl('/error');
        this.ngxService.stop()
      }
    );
  }


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
      this.ngxService.stop();
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
            //this.booking('')
            this.modal.hide()
            
            this.ngxService.stop();
          }else{
            this.ngxService.start()      
            this.loginService.firstTimeSocial(data).subscribe(
              res => {
              
                this.loginService.setUserDetails(res['userDetails'][0])
                this.loginService.setToken(res['token']['token']);
              //  this.booking('')
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
