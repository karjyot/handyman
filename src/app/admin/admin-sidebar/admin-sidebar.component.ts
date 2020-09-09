import { Component, OnInit } from '@angular/core';
import { NavigationEnd,Router } from "@angular/router";
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  selectedPage = "dashboard"
  constructor(private router : Router) { }

  ngOnInit() {
  }
  redirectUrl(type){
    if(type == 'dashboard'){
      this.selectedPage = 'dashboard'
      this.router.navigateByUrl('admin/dashboard');
    }
    if(type == 'users'){
      this.selectedPage = 'users'
      this.router.navigateByUrl('admin/users');
    } if(type == 'bookings'){
      this.selectedPage = 'bookings'
      this.router.navigateByUrl('admin/bookings');
    } if(type == 'learn-more'){
      this.selectedPage = 'learn-more'
      this.router.navigateByUrl('admin/learn-more');
    } if(type == 'how-it-works'){
      this.selectedPage = 'how-it-works'
      this.router.navigateByUrl('admin/how-it-works');
    } 
    if(type == 'categories'){
      this.selectedPage = 'categories'
      this.router.navigateByUrl('admin/categories');
    } 
    if(type == 'admin-users'){
      this.selectedPage = 'admin-users'
      this.router.navigateByUrl('admin/admin-users');
    } 
    if(type == 'quotes'){
      this.selectedPage = 'quotes'
      this.router.navigateByUrl('admin/quotes');
    } 
    if(type == 'terms'){
      this.selectedPage = 'terms'
      this.router.navigateByUrl('admin/terms');
    } 
    if(type == 'privacy'){
      this.selectedPage = 'privacy'
      this.router.navigateByUrl('admin/privacy');
    } 
    if(type == 'cms'){
      this.selectedPage = 'cms'
      this.router.navigateByUrl('admin/cms');
    } 
    if(type == 'faqs'){
      this.selectedPage = 'faqs'
      this.router.navigateByUrl('admin/faq');
    } 
    if(type == 'terms'){
      this.selectedPage = 'terms'
      this.router.navigateByUrl('admin/terms');
    } 
    if(type == 'privacy'){
      this.selectedPage = 'privacy'
      this.router.navigateByUrl('admin/privacy');
    } 
    if(type == 'about'){
      this.selectedPage = 'about'
      this.router.navigateByUrl('admin/about-us');
    } 
    if(type == 'support-fee'){
      this.selectedPage = 'support-fee'
      this.router.navigateByUrl('admin/support-fee');
    } 
    if(type == 'postal-codes'){
      this.selectedPage = 'postal-codes'
      this.router.navigateByUrl('admin/postal-codes');
    } 

    
  }
}
