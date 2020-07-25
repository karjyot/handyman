import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MustMatch } from './../helpers/must-match.validator';
import { LoginService } from "./../services/login.service";
import { Router,ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-become-pro',
  templateUrl: './become-pro.component.html',
  styleUrls: ['./become-pro.component.css']
})
export class BecomeProComponent implements OnInit {
  addUserForm : FormGroup
  submitted = false;
  cate:any
  countries:any;
  modal: BsModalRef | null;
  constructor(private modalService: BsModalService,private route: ActivatedRoute,private router : Router,private loginService: LoginService,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    
    
    this.addUserForm = this.formBuilder.group({ 
     // id: ['', [Validators.required]],
     // ns: ['', [Validators.required]],
      //linkedin: [''],
      first_name: ['', [Validators.required]],
      last_name: [''],
      email: ['', [Validators.required,Validators.email]],
     // country: ['', [Validators.required]],
      service: ['',[Validators.required]],
      zip:['',[Validators.required]],
      phone:['',[Validators.required]],
    });
    this.ngxService.start();
    this.loginService.getCatAndSub().subscribe((result) => {
      this.cate = result['categories']
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
     });
  
  }

  addUser(template){
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.toastr.error("Please fill the required information.")
        return;
    }
   
    this.ngxService.start();
     this.loginService.becomePro(this.addUserForm.value).subscribe((result) => {
       this.router.navigateByUrl('/')
      this.ngxService.stop();
      this.addUserForm.reset();
      this.modal= this.modalService.show(template, Object.assign({}, ));
      //
     }, (err) => {
      this.toastr.error('Network Error occured', 'Error');
      this.ngxService.stop();
     });
  }
 
  login(){
    this.modal.hide();
    this.router.navigateByUrl('/login')
  }
  get f() { return this.addUserForm.controls; }
}