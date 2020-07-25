import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cate:any;
  home:any;
  email:any;
  constructor(private router : Router,private loginService: LoginService,private ngxService: NgxUiLoaderService,private modalService: BsModalService,private toastr: ToastrService){}

  ngOnInit(): void {
  
    this.ngxService.start();
    this.loginService.getCatAndSub().subscribe((result) => {
      this.cate = result['categories']
      this.loginService.getHomeContent().subscribe((result) => {
        this.home =  result["success"][0]
      
       
      })
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
     });
  }
  handymanService(id){
    this.loginService.setCatID({id:id})
    this.router.navigateByUrl('/services')
  }
  subscribe(){
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(!pattern.test(this.email)){
      this.toastr.error("Please enter valid email address.")
      return;
    }
    this.ngxService.start();
    this.loginService.subscribeEmail({email:this.email}).subscribe((result) => {
      this.email = "";
      this.toastr.success("Please check your email for email subscription.")
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error("You have already subscribed")
      this.ngxService.stop();
     });
  
  }
}
