import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-cms',
  templateUrl: './admin-cms.component.html',
  styleUrls: ['./admin-cms.component.css']
})
export class AdminCmsComponent implements OnInit {
  contentForm : FormGroup
  submitted = false
  public custom = {dd1:"",dd2:"",dd3:"",dd4:"",dd5:"",contact:"",header:"",signin:"",choose:"",submit:"",upperHeader:"",about:"",how:"",fq1:"",fq1Ans:"",fq2:"",fq2Ans:"",fq3:"",fq4:"",fq5:"",fq3Ans:"",fq4Ans:"",fq5Ans:"",pickTime:"",bookInstatnly:"",proArrives:"",pickTimeLower:"",skilled:"",reliable:"",flexible:"",lowrTitle1:"",text1:"",lowrTitle2:"",lowrTitle3:"",text3:"",text2:"",worksTitle3:"",worksTitle2:"",worksTitle1:""};
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

  ngOnInit() {
    this.contentForm = this.formBuilder.group({    
      contact: [''],
      header: ['' ],
      upperHeader: [''],
      about: [''],
      how:  [''],
      fq1:  [''],
      fq1Ans: [''],
      fq2: [''],
      fq2Ans: [''],
      fq3: [''],
      fq4: [''],
      fq5: [''],
      fq3Ans: [''],
      fq4Ans: [''],
      fq5Ans: [''],
      signin: [''],
      choose: [''],
      submit: [''],
      dd1:[''],
      dd2:[''],
      dd3:[''],
      dd4:[''],
      dd5:[''],
      pickTime:[''],
      bookInstatnly:[''],
      proArrives:[''],
      pickTimeLower:[''],
      skilled:[''],
      reliable:[''],
      flexible:[''],
      lowrTitle1:[''],
      text1:[''],
      lowrTitle2:[''],
      lowrTitle3:[''],
      text3:[''],
      text2:[''],
      worksTitle3:[''],
      worksTitle1:[''],
      worksTitle2:[''],

     
  });
  this.loginService.getHomeContent().subscribe((data) => {
    let result = data["success"][0];
    this.custom.contact = result.contact
    this.custom.header = result.header
    this.custom.upperHeader = result.upperHeader
    this.custom.about = result.about
    this.custom.how = result.how
    this.custom.fq1 = result.fq1
    this.custom.fq1Ans = result.fq1Ans
    this.custom.fq2 = result.fq2
    this.custom.fq2Ans = result.fq2Ans
    this.custom.fq3 = result.fq3
    this.custom.fq3Ans = result.fq3Ans
    this.custom.fq4 = result.fq4
    this.custom.fq4Ans = result.fq4Ans
    this.custom.fq5 = result.fq5
    this.custom.fq5Ans = result.fq5Ans
    this.custom.signin = result.signin
    this.custom.choose = result.choose
    this.custom.submit = result.submit
    this.custom.dd1 = result.dd1
    this.custom.dd2 = result.dd2
    this.custom.dd3 = result.dd3
    this.custom.dd4 = result.dd4
    this.custom.dd5 = result.dd5

    this.custom.worksTitle3 = result.worksTitle3
    this.custom.worksTitle2 = result.worksTitle2
    this.custom.worksTitle1 = result.worksTitle1


    this.custom.pickTime = result.pickTime
    this.custom.bookInstatnly = result.bookInstatnly
    this.custom.proArrives = result.proArrives
    this.custom.pickTimeLower = result.pickTimeLower
    this.custom.skilled = result.skilled
    this.custom.reliable = result.reliable
    this.custom.flexible = result.flexible
    this.custom.lowrTitle1 = result.lowrTitle1
    this.custom.text1 = result.text1
    this.custom.lowrTitle2 = result.lowrTitle2
    this.custom.lowrTitle3 = result.lowrTitle3
    this.custom.text3 = result.text3
    this.custom.text2 = result.text2
   }, (err) => {
    this.ngxService.stop();
    
   });
 
  }

  save(){
    console.log(this.contentForm.value)
    this.submitted = true
    if(this.contentForm.invalid){
      return;
    }
    this.ngxService.start();
    this.loginService.updateHomeContent(this.contentForm.value).subscribe((result) => {
      this.router.navigateByUrl('admin/cms');
      this.ngxService.stop();
     this.toastr.success('Content updated succesfully.')
     }, (err) => {
      this.ngxService.stop();
      
     });
  }
  get f() { return this.contentForm.controls; }

}
