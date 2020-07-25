
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LoginService } from "./../services/login.service";
import {MatSort} from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router : Router,private loginService: LoginService,private ngxService: NgxUiLoaderService,private modalService: BsModalService){}
  displayedColumns: string[] = ['order_id', 'date', 'hours', 'job','address','price'];
  dataSource;
  displayNoRecords : any
  isLogin:any;
  modal: BsModalRef | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  currentRow:any;


  ngOnInit() {
    this.listData()
  } 

  listData(){
    this.ngxService.start();
    let id = this.loginService.getUserDetails().id;
    this.loginService.listBookings(id).subscribe((result:any) => {
      console.log(result)
     let records = result["bookings"]
     records.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
      Date(val1.created_at)})
      if(records.length > 0){
        this.dataSource=new MatTableDataSource(records);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      }else{
        this.dataSource = [];
      }
    
      this.ngxService.stop();
     },(err) => {
      try{
        let errMessage = err["error"]["message"];
        //this.toastr.error(errMessage);
       }catch(e){

       }
      // this.ngxService.stop();
      })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if(this.dataSource.filteredData){
      if(this.dataSource.filteredData.length==0){
        this.displayNoRecords=true;
      }else{
        this.displayNoRecords=false;
      }
    }
  }
  logout(){
    this.loginService.deleteToken();
    this.loginService.deleteUserDetails();
    this.isLogin = false;
    this.loginService.sendLogout(false); 
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/"])); 
   }

   address(template:any,data){
    this.currentRow = data;
    this.modal= this.modalService.show(template, Object.assign({}, ));
  }
  
}