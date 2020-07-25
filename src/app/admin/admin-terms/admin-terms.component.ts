import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../../admin/services/admin.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-terms',
  templateUrl: './admin-terms.component.html',
  styleUrls: ['./admin-terms.component.css']
})
export class AdminTermsComponent implements OnInit {
  modalRef: BsModalRef | null;
  public data = {
      content: ""
  }
  urls:any;
  public files: any[];
  constructor(private adminService: AdminService, private modalService: BsModalService, private formBuilder: FormBuilder, private ngxService: NgxUiLoaderService, private toastr: ToastrService, private router: Router, ) {}
  ngOnInit() {

      this.ngxService.start()
      this.adminService.terms().subscribe(
          res => {
              let terms = res['success'][0]['content'];
              this.data.content = terms;
              this.urls =  res['success'][0].image
              console.log(terms)
              this.ngxService.stop()
          },
          err => {
              this.ngxService.stop()

          }
      )
  }
  updateTerms(template: any) {
      this.modalRef = this.modalService.show(template,
          Object.assign({}, {
              class: 'gray modal-lg'
          })
      );
  }

  confirm() {
      this.ngxService.start();
      const formData = new FormData();
      if(this.files){
      for (const file of this.files) {
          formData.append('file', file, file.name);
      }
     }
     formData.append('content', this.data.content);
      this.adminService.addTerms(formData).subscribe((result) => {
          this.router.navigateByUrl('admin/terms');
          this.ngxService.stop();
          this.modalRef.hide();

      }, (err) => {
          this.ngxService.stop();
      });

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
  removeImg(data:any){
    this.urls = "";
  }
}