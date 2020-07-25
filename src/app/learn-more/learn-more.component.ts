import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationEnd  } from "@angular/router";
import { AdminService } from "./../admin/services/admin.service";

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent implements OnInit {
  privacy:any;
  constructor(private toastr: ToastrService,private router : Router, private loginService: AdminService,private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

    this.ngxService.start()
    this.loginService.learnMore().subscribe(
      res => {
      //  console.log(res['success'])
        if(res['success'].length > 0){
       this.privacy = res['success'][0];
        }
     
       
       this.ngxService.stop()
      },
      err => { 
        this.ngxService.stop()
        
      }
    )
  }

}
