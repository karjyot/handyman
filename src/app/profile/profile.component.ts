import { Component, OnInit } from '@angular/core';

import { LoginService } from "./../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  profileImg :any;
  public files: any[];
  imageUrl:any;
  userType:any;
  countries:any;
  isLogin:any;
  constructor(private router : Router,private formBuilder: FormBuilder,private loginService: LoginService,private toastr: ToastrService,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
   
    this.profileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      
  })
  this.getDetails();
  
  }
  onSubmit() {

    this.submitted = true;
    if (this.profileForm.invalid) {
        return;
    }
    this.ngxService.start();
    let data = {
      first_name:this.profileForm.get('first_name').value,
      last_name:this.profileForm.get('last_name').value,
      email:this.profileForm.get('email').value,
      phone:this.profileForm.get('phone').value,
      
     // ns:this.profileForm.get('ns').value,
    }
   
    let id = this.loginService.getUserDetails().id;
    this.loginService.updateUser(data,id).subscribe((result) => {
      let userDetails = this.loginService.getUserDetails();
      userDetails.first_name = this.profileForm.get('first_name').value
      userDetails.last_name = this.profileForm.get('last_name').value
      userDetails.email = this.profileForm.get('email').value
    
      userDetails.phone = this.profileForm.get('phone').value

    //  userDetails.ns = this.profileForm.get('ns').value
      this.loginService.setUserDetails(userDetails)
      this.toastr.success("Profile updated successfully.")
      this.loginService.setUserDetails(userDetails)
      this.ngxService.stop();
     }, (err) => {
  
      this.ngxService.stop();
     });
  }
  uploadFile(event){
    var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
    let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
    if(allowedExtensions.indexOf(fileExtesion) == -1){
      this.toastr.error("There was an upload error.Make sure to upload a JPG or PNG file and try again.");
      return;
    }
    this.ngxService.start();
  
    this.files = event.target.files;
  
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
  
        const reader = new FileReader();
        reader.onload = e => this.profileImg = reader.result;
  
        reader.readAsDataURL(file);
    }
    setTimeout(()=>{ 
       const formData = new FormData();
        for (const file of this.files) {
            formData.append('file', file, file.name);
        }
        let id = this.loginService.getUserDetails().id;
        formData.append('id', id); 
        this.loginService.updateProfileImage(formData).subscribe((result) => {
          let userDetails = this.loginService.getUserDetails();
          let splitted = userDetails.image.split('uploads/');
          let fileupdated =  splitted[0] + 'uploads/'+this.files[0].name
          userDetails.image = fileupdated
          // userDetails.first_name = this.profileForm.get('first_name').value
          // userDetails.last_name = this.profileForm.get('last_name').value
          // userDetails.email = this.profileForm.get('email').value
          // userDetails.country = this.profileForm.get('country').value
          // userDetails.phone = this.profileForm.get('phone').value
          // userDetails.linkedin = this.profileForm.get('linkedin').value
          this.loginService.setUserDetails(userDetails)
          this.imageUrl = result["message"];
          this.loginService.sendImageUpdate( this.imageUrl);
          this.toastr.success('Image updated successfully.');
          this.ngxService.stop();
         }, (err) => {
        
          this.ngxService.stop();
         });
        },100);
  }


  getDetails(){
    let userDetails = this.loginService.getUserDetails();
    this.profileForm.controls['first_name'].setValue(userDetails.name);
    this.profileForm.controls['last_name'].setValue(userDetails.last_name);
    this.profileForm.controls['email'].setValue(userDetails.email);
    this.profileForm.controls['phone'].setValue(userDetails.phone);

    this.imageUrl = userDetails.image;
  }

  get f() { return this.profileForm.controls; }
  logout(){
    this.loginService.deleteToken();
    this.loginService.deleteUserDetails();
    this.isLogin = false;
    this.loginService.sendLogout(false); 
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/"])); 
   }
}
