import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationEnd  } from "@angular/router";
import { AdminService } from "./../admin/services/admin.service";
import { LoginService } from "./../services/login.service";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  faq:any;
  constructor(private toastr: ToastrService,private loginService : LoginService,private router : Router, private adminService: AdminService,private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder) { }
  home:any
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

    this.ngxService.start()
    this.adminService.faq().subscribe(
      res => {
        this.loginService.getHomeContent().subscribe((result) => {
          this.home =  result["success"][0]
        
         
        })
        if(res['success'].length > 0){
       this.faq = res['success'][0];
        }
     
       
       this.ngxService.stop()
      },
      err => { 
        this.ngxService.stop()
        
      }
    )
  }

}