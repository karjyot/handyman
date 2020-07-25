import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MustMatch } from './../helpers/must-match.validator';
import { LoginService } from "./../services/login.service";
import { Router,ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addUserForm : FormGroup
  submitted = false;
  countries:any;
  modal: BsModalRef | null;
  constructor(private modalService: BsModalService,private route: ActivatedRoute,private router : Router,private loginService: LoginService,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    
    if(this.loginService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }
    this.addUserForm = this.formBuilder.group({ 
     // id: ['', [Validators.required]],
     // ns: ['', [Validators.required]],
      //linkedin: [''],
      first_name: ['', [Validators.required]],
      last_name: [''],
      email: ['', [Validators.required,Validators.email]],
     // country: ['', [Validators.required]],
      phone: ['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    },{
      validator: MustMatch('password', 'confirmPassword')
  });
  let param1 = this.route.snapshot.queryParams["email"];
    if(param1){
      this.addUserForm.controls["email"].setValue(param1);
    }
  
  }

  addUser(template){
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.toastr.error("Please fill the required information.")
        return;
    }
   
    this.ngxService.start();
     this.loginService.registerUser(this.addUserForm.value).subscribe((result) => {
      this.ngxService.stop();
      this.modal= this.modalService.show(template, Object.assign({}, ));
      //
     }, (err) => {
      this.toastr.error('Email is already exists.', 'Error');
      this.ngxService.stop();
     });
  }
 
  login(){
    this.modal.hide();
    this.router.navigateByUrl('/login')
  }
  get f() { return this.addUserForm.controls; }
}