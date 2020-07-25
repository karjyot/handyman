import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from "./../services/login.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MustMatch } from './../helpers/must-match.validator';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(private toastr: ToastrService,private router : Router, private activatedRoute: ActivatedRoute,private loginService: LoginService,private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
  
    this.loginService.confirmAccount(id).subscribe(
      res => {
       this.toastr.success("Your account is succesfully verified")
       this.router.navigateByUrl('/login');
        this.ngxService.stop()
      },
      err => {  
        this.router.navigateByUrl('/error');
        this.ngxService.stop()
      }
    );
  }

}
