import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../../admin/services/admin.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-support-fee',
  templateUrl: './support-fee.component.html',
  styleUrls: ['./support-fee.component.css']
})

export class SupportFeeComponent implements OnInit {
  price:any
  constructor(private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.adminService.getSupportFee().subscribe((result) => {
      this.price = result['success'][0].fee
    
      this.ngxService.stop();
    
     }, (err) => {
     
      this.ngxService.stop();
      
     });   
  }

  complete(){
    this.ngxService.start();
    this.adminService.addSuportFee({price:this.price}).subscribe((result) => {
      this.toastr.success("Fee updated successfully.")
   
      this.ngxService.stop();
    
     }, (err) => {
     
      this.ngxService.stop();
      
     });        
  }
  

}
