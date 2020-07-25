import { Component, OnInit,Inject,NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private _zone: NgZone,private modalService: BsModalService,private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  bookingDetails:any;
  serviceDetails:any;
  bookingID:any
  ngOnInit(): void {
    this.bookingDetails = this.loginService.getBookingDetails()
    this.serviceDetails = this.loginService.getServiceDetails()
    this.bookingID  = this.loginService.getBookingID().bookingID
  }

}
