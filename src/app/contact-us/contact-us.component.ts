import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationEnd } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "./../services/login.service";
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private toastr: ToastrService,private router : Router, private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder,private loginService: LoginService) { }
  submitted = false;
  contactForm: FormGroup;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.contactForm = this.formBuilder.group({    
      name: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
         message: ['', [Validators.required]],
  });
  }
  contact(){
   
    this.submitted = true;
    if (this.contactForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
      }
      this.ngxService.start();
      this.loginService.contact(this.contactForm.value).subscribe((result) => {
        this.toastr.success("Your message sent successfully.");
        this.contactForm.reset();
        this.ngxService.stop();  
         }, (err) => {
         
          this.ngxService.stop();  
         });

  }
  get f() { return this.contactForm.controls; }
}
