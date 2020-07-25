import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-postal',
  templateUrl: './admin-postal.component.html',
  styleUrls: ['./admin-postal.component.css']
})
export class AdminPostalComponent implements OnInit {
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  listUsers:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  perPage = 10;
  totalEntries = "";
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
profileImg :any;
categories:any;
userId:'';
id:'';
searchText:'';
p = 1;
modalRefDel:BsModalRef | null;
modalRefStatus:BsModalRef | null;
postStatus = "";
status= "";
countries:any
  public infos = {ns:"",country:"", id:"", fname:'',  lname: '',email:'',phone:'',file:'' };
  public signupData = { ns:"",country:"",id:"",name:'',  lname: '',password:'',email:'',c_password:'',phone:'',file:'' };
submitted = false;
  ngOnInit() {
   
    this.updateInfo = this.formBuilder.group({    
      fname: ['', [Validators.required]],
      
  });
   this.signupForm = this.formBuilder.group({    
    fname: ['', [Validators.required]],
   
});
this.ngxService.start()
    this.adminService.postalCodes().subscribe(
      res => {
        this.listUsers = res['message'];
        this.totalEntries = this.listUsers.length;
        this.listUsers.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
          Date(val1.created_at)})
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )
  
  }

  
  addUser(template: any){
    this.modalRefAdd = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cancelAddUser(){
    this.signupData.name = "";
   
   this.modalRefAdd.hide();

  }


  signup(){
  this.submitted = true;
  if (this.signupForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
      }
      this.ngxService.start()
      const formData = new FormData();
      // formData.append('id', this.signupData.id);
     // formData.append('ns', this.signupData.ns);
      formData.append('name', this.signupData.name);
    

      this.adminService.addPostalCode(formData).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('Postal code added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/postal-codes"]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          
       }, (err) => {
        
        this.ngxService.stop();
        
       });
  }
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
   console.log(userDetails.country_code)
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.fname = userDetails.name;
  
   
    this.userId = userDetails.id
  }
  update(){
   
        this.submitted = true;
        if (this.updateInfo.invalid) {
          this.toastr.error('Please provide the required information.');
             return;
       }
       this.ngxService.start()
       const formData = new FormData();
       if(this.files){
       for (const file of this.files) {
           formData.append('file', file, file.name);
       }
      }

      //  formData.append('id', this.infos.id);
       formData.append('name', this.infos.fname);
      
       //formData.append('ns', this.infos.ns);
      
       this.adminService.updatePostalcode(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/postal-codes"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Postal code updated succesfully.', 'Success');
          
       }, (err) => {
       
        this.ngxService.stop();
        
       });
    
      }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.adminService.deletePostalCode(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/postal-codes"]));
            this.modalRefDel.hide();
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
      }

    

}
