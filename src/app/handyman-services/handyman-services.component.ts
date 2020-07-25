import { Component, OnInit,Inject,NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
export interface State {
  id: string;
  name: string;
  price: string;
}
@Component({
  selector: 'app-handyman-services',
  templateUrl: './handyman-services.component.html',
  styleUrls: ['./handyman-services.component.css']
})
export class HandymanServicesComponent implements OnInit {
  stateCtrl = new FormControl();
  categoryContol = new FormControl();
  filteredStates: Observable<State[]>;
  states =   [
   
  ];
  selectedService:any
  subCate:any
  filteredStreets: Observable<string[]>;
  categorySelect:any
  constructor(private _zone: NgZone,private modalService: BsModalService,private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  categories:any;
  ngOnInit(): void {
    this.ngxService.start();
    this.loginService.getCatAndSub().subscribe((result) => {
     let cate = result['categories']
     this.subCate =  result['subCate']
     let subCate = result['subCate']
      this.states = this.subCate
     for(var i=0; i<cate.length; i++){
      cate[i].sub= [];
       for(var j=0; j<subCate.length; j++){
        if(cate[i].id == subCate[j].cat_id){
          cate[i].sub.push( subCate[j])
        }
       }
       setTimeout(() => {
        this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
      }, 500);
      
     }
     this.categories = cate
     console.log(this.categories)
     this.categoryContol.setValue('all')
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
     });
  }
  ngAfterViewChecked() {
    if(this.loginService.getCatID()){
      this.scroll(this.loginService.getCatID().id) 
      
    
    }
    

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
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(' '),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
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
     this.router.navigateByUrl('/services/'+name+'/'+this.selectedService.id)
    }
  }
  scroll(id) {
    let el = document.getElementById(id);
    if(el !=null){
      el.scrollIntoView({behavior: 'smooth'});
      this.loginService.setCatID(null)
    }
   
  }

  searchLower(val){
    console.log(val)
    for(var i=0; i<this.subCate.length; i++){
      var isExist = false
      if(this.subCate[i].name == val){
        this.selectedService = this.subCate[i]
        break;
      }
    }
    this.loginService.setBookingDetails(this.selectedService)
    let name = this.selectedService.name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigateByUrl('/services/'+name+'/'+this.selectedService.id)
   
  }

}
