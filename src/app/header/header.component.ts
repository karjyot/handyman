import { Component, OnInit } from '@angular/core';
import { LoginService } from "./../services/login.service";
import { NavigationEnd,Router } from "@angular/router";
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin : any;
  currentUrl:any;
  imageUrl:any;
  details:any
  constructor(private loginService: LoginService,private router: Router) {this.subscribeRouterEvents(); }
  subscribeRouterEvents = () => {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
    this.currentUrl = this.router.url;
    this.isLogin = this.loginService.isLoggedIn();
    this.details = this.loginService.getUserDetails();
    if(this.details){
      this.imageUrl = this.details.image;
    }
    })
  }
  ngAfterViewInit(){
       this.loginService.imageUrl$.subscribe((data) => {
        this.imageUrl = data;
  })
  }
  ngOnInit() {
   this.details = this.loginService.getUserDetails();
    if(this.details){
      this.imageUrl = this.details.image;
    }
   
    
  }
  urlmatch(url){
    return this.router.url.includes(url);
 }
 logout(){
  this.loginService.deleteToken();
  this.loginService.deleteUserDetails();
  this.isLogin = false;
  this.loginService.sendLogout(false); 
  this.router.navigateByUrl('/dashboard', {skipLocationChange: true}).then(()=>
  this.router.navigate(["/"])); 
 }
}
