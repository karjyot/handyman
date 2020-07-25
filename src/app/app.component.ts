import { Component,HostListener } from '@angular/core';
import { LoginService } from "./services/login.service";
import { NavigationEnd,Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginService: LoginService,private router: Router){
    this.validateUser();
    // this.loginService.getHomeContent().subscribe((result) => {
    //   this.loginService.setHomeData( result["success"][0])
    
     
    // })

  }
  
  
  
    validateUser(){
      let details = this.loginService.getUserDetails();
      if(details){
          this.loginService.validateUser(details.email).subscribe((result) => {
    
          }, (err) => {
              this.loginService.deleteToken();
              this.loginService.deleteUserDetails();
           
              this.loginService.sendLogout(false); 
              this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
              this.router.navigate(["/"])); 
      });
      }
    }
  }
  
  