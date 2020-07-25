import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-subcategories',
  templateUrl: './admin-subcategories.component.html',
  styleUrls: ['./admin-subcategories.component.css']
})
export class AdminSubcategoriesComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
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
  public filesMain: any[];
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
urls:any;
subId:any
urlsMain:any
  public infos = {ns:"",country:"", id:"", fname:'',  lname: '',email:'',phone:'',file:'', feature1:"",feature2:"",feature3:"",feature4:"",feature5:"",feature6:"",feature7:"",feature8:"",about:"",price:""};
  public signupData = { ns:"",country:"",id:"",name:'',  lname: '',password:'',email:'',c_password:'',phone:'',file:'',feature1:"",feature2:"",feature3:"",feature4:"",feature5:"",feature6:"",feature7:"",feature8:"",about:"",price:""};
submitted = false;
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subId = id 
    this.updateInfo = this.formBuilder.group({    
      fname: ['', [Validators.required]],
      price: ['', [Validators.required]],
      about:[''],
      feature1 : [''],
      feature2 : [''],
      feature3 : [''],
      feature4 : [''],
      feature5 : [''],
     
  });
   this.signupForm = this.formBuilder.group({    
    fname: ['', [Validators.required]],
    about:[''],
    feature1 : [''],
      feature2 : [''],
      feature3 : [''],
      feature4 : [''],
      feature5 : [''],
      price: ['', [Validators.required]],
    
});
this.ngxService.start()
    this.adminService.getSubCategories(id).subscribe(
      res => {
        this.listUsers = res['categories'];
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

  viewUserInfo(template: any,users){
    this.currentUser = users
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
 
  }
  addUser(template: any){
    this.modalRefAdd = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cancelAddUser(){
    this.signupData.name = "";
    this.signupData.lname = "";
    this.signupData.email = "";
    this.signupData.password = "";
    this.signupData.c_password = "";
    this.signupData.phone = "";
    this.signupData.price = "";
    this.urls = [];
    this.urlsMain = [];
    this.signupData.ns = "";
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
      if(this.files){
        for (const file of this.files) {
          formData.append('file', file, file.name);
      
      }
    }
    if(this.filesMain){
      for (const file of this.files) {
        formData.append('fileMain', file, file.name);
    
    }
  }
      formData.append('name', this.signupData.name);
      formData.append('about', this.signupData.about);
      formData.append('feature1', this.signupData.feature1);
      formData.append('feature2', this.signupData.feature2);
      formData.append('feature3', this.signupData.feature3);
      formData.append('feature4', this.signupData.feature4);
      formData.append('feature5', this.signupData.feature5);
      formData.append('price', this.signupData.price);
     

      this.loginService.addsubCategory(formData,this.subId).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('Sub category added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/subcategories/"+this.subId]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          
       }, (err) => {
        
        this.ngxService.stop();
        
       });
  }
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
   console.log(userDetails)
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.fname = userDetails.name;
    this.infos.about =  userDetails.about;
    this.infos.price =  userDetails.price;
    this.infos.feature1 =  userDetails.feature1;
    this.infos.feature2 =  userDetails.feature2;
    this.infos.feature3 =  userDetails.feature3;
    this.infos.feature4 =  userDetails.feature4;
    this.infos.feature5 =  userDetails.feature5;

    this.urls =  userDetails.image;
    this.urlsMain =  userDetails.main_image;
    this.profileImg =  userDetails.image;
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
      if(this.filesMain){
        for (const file of this.filesMain) {
            formData.append('fileMain', file, file.name);
        }
       }
      //  formData.append('id', this.infos.id);
       formData.append('name', this.infos.fname);
       formData.append('price', this.infos.price);
       formData.append('about', this.infos.about);
       formData.append('feature1', this.infos.feature1);
      formData.append('feature2', this.infos.feature2);
      formData.append('feature3', this.infos.feature3);
      formData.append('feature4', this.infos.feature4);
      formData.append('feature5', this.infos.feature5);
       //formData.append('ns', this.infos.ns);
      
       this.loginService.updateSubCategory(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/subcategories/"+this.subId]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Your information updated succesfully.', 'Success');
          
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
        this.adminService.deleteSubCat(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/subcategories/"+this.subId]));
            this.modalRefDel.hide();
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
      }

      
      onSelectFile(event) {
        var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
        let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
        if(allowedExtensions.indexOf(fileExtesion) == -1){
          this.toastr.error("There was an upload error.Make sure to upload a JPG or PNG file and try again.");
          return;
        }
        if(event.target.files[0]){
        if(event.target.files[0].size/1024/1024 > 2){
          this.toastr.error('File size should be less than 2 mb.');
          return;
         }
        }
        
        if (event.target.files && event.target.files[0]) {
          this.files = event.target.files;
          //  for (let i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
    
                    reader.onload = (event:any) => {
                    
                       this.urls = event.target.result; 
                     
                    }

                    reader.readAsDataURL(event.target.files[0]);
            //}
            
        }
      }

      onSelectFileMain(event) {
        var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
        let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
        if(allowedExtensions.indexOf(fileExtesion) == -1){
          this.toastr.error("There was an upload error.Make sure to upload a JPG or PNG file and try again.");
          return;
        }
        if(event.target.files[0]){
        if(event.target.files[0].size/1024/1024 > 2){
          this.toastr.error('File size should be less than 2 mb.');
          return;
         }
        }
        
        if (event.target.files && event.target.files[0]) {
          this.filesMain = event.target.files;
          //  for (let i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
    
                    reader.onload = (event:any) => {
                    
                       this.urlsMain = event.target.result; 
                     
                    }

                    reader.readAsDataURL(event.target.files[0]);
            //}
            
        }
      }
      removeImgMain(data:any){
        this.urlsMain = "";
      }
      removeImg(data:any){
        this.urls = "";
      }
      viewSub(id){
        this.router.navigateByUrl('admin/subcategories/'+id)
      }
}
