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
export interface State {
  id: string;
  name: string;
  price: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
cate:any
subCate:any
selectedService:any
home:any
  constructor(private modalService: BsModalService,private router : Router,private loginService: LoginService,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  stateCtrl = new FormControl();
  categoryContol = new FormControl();
  filteredStates: Observable<State[]>;
  states =   [
   
  ];
  filteredStreets: Observable<string[]>;
  categorySelect:any
  ngOnInit(): void {
    this.ngxService.start();
    this.loginService.getCatAndSub().subscribe((result) => {
      this.cate = result['categories']
      this.subCate = result['subCate']
      this.states = this.subCate
      this.loginService.getHomeContent().subscribe((result) => {
        this.home =  result["success"][0]
      
       
      })
      //this.home = this.loginService.getHomeData();
      setTimeout(() => {
        this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
      }, 500);
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
     });
     
     
     this.categoryContol.setValue('all')
   //  this.stateCtrl = 'all'
  }
  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getSubCate(){
    this.stateCtrl.setValue('')
    if(this.categoryContol.value == 'all'){
      this.states = this.subCate;
      setTimeout(() => {
        this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
      }, 500);
    }else{
      this.ngxService.start();
    this.loginService.subbyId(this.categoryContol.value).subscribe((result) => {
      this.states = result['success'];
      setTimeout(() => {
        this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
      }, 500);
      this.ngxService.stop();
     }, (err) => {
      //this.toastr.error('Invalid username/password.');
      this.ngxService.stop();
     });
    }
    
    
  }  

  search(){
    if(!this.stateCtrl.value){
      this.toastr.error("Please enter the valid service");
      return;
    }
    for(var i=0; i<this.subCate.length; i++){
      var isExist = false
      if(this.subCate[i].name == this.stateCtrl.value){
        this.selectedService = this.subCate[i]
        isExist = true
        break;
      }
    }

    if(!isExist){
      this.toastr.error("Service is not exists")
    }else{
     this.loginService.setBookingDetails(this.selectedService)
    let name = this.selectedService.name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigateByUrl('/services/'+name)
    }
  }

  searchLower(){
  if(!this.stateCtrl.value){

    this.toastr.error("Please enter the valid service")
    return
  }
    for(var i=0; i<this.subCate.length; i++){
      var isExist = false
      if(this.subCate[i].name == this.stateCtrl.value){
        this.selectedService = this.subCate[i]
        break;
      }
    }
    this.loginService.setBookingDetails(this.selectedService)
    let name = this.selectedService.name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigateByUrl('/services/'+name)
   
  }
  searchSingle(value){
    for(var i=0; i<this.subCate.length; i++){
      var isExist = false
      if(this.subCate[i].name == value){
        this.selectedService = this.subCate[i]
        break;
      }
    }
    this.loginService.setBookingDetails(this.selectedService)
    let name = this.selectedService.name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigateByUrl('/services/'+name)
  }
  handymanService(id){
    this.loginService.setCatID({id:id})
    this.router.navigateByUrl('/services')
  }
  gotoServices(){
    this.router.navigateByUrl('/services')
  }
}
