import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {AppSettings } from './../constants';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  userData: any; 
  catData:any

  private logoutType: Subject<any> = new Subject<any>();

  public logoutType$ = this.logoutType.asObservable();

  public sendLogout(data: any){

    this.logoutType.next(data);
}

  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  login(authCredentials) {
    return this.http.post(AppSettings.API_ENDPOINT + 'login', authCredentials,this.noAuthHeader);
  }
  

  confirmNewPassword(newPassword) {
    return this.http.post(AppSettings.API_ENDPOINT + 'confirmPassword', newPassword,this.noAuthHeader);
  }
  forgotPassword(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'checkEmailExists', email,this.noAuthHeader);
  }
  validateFogetToken(token) {
    return this.http.post(AppSettings.API_ENDPOINT + 'validateFogetToken', token,this.noAuthHeader);
  }
  //Helper Methods

  setToken(token: string) {
    console.log(token)
    localStorage.setItem('token', token);
  }
  setUserDetails(data:any){
    localStorage.setItem('userDetailsHandyman',  JSON.stringify(data));
  }

  registerSocial(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'registerSocial', data,this.noAuthHeader);
  }

  firstTimeSocial(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'firstTimeSocial', data,this.noAuthHeader);
  }
  
  getUserDetails(){
    let details = localStorage.getItem('userDetailsHandyman');
    return JSON.parse(details);
  }

  setCatID(data:any){
    localStorage.setItem('setCatID',  JSON.stringify(data));
  }
  
  getCatID(){
    let details = localStorage.getItem('setCatID');
    return JSON.parse(details);
  }

  setHomeData(data:any){
    localStorage.setItem('setHomeData',  JSON.stringify(data));
  }
  
  getHomeData(){
    let details = localStorage.getItem('setHomeData');
    return JSON.parse(details);
  }

  confirmAccount(id){
    return this.http.get(AppSettings.API_ENDPOINT  + 'confirm-account/'+id);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  deleteUserDetails() {
    localStorage.removeItem('userDetailsHandyman');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      try{
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }catch(e){
        return token;
      }
     
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  registerUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'register',jsonPayload,this.noAuthHeader);
  }
  becomePro(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'becomePro',jsonPayload,this.noAuthHeader);
  }
  addCategory(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'addCategory',jsonPayload,this.noAuthHeader);
  }
  addsubCategory(jsonPayload,id):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'addsubCategory/'+id,jsonPayload,this.noAuthHeader);
  }


  
  privacy() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/privacy');
  }

  getsubcategoryDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getsubcategoryDetails/'+id);
  }


  terms() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/terms');
  }

  about() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/about');
  }

  contact(data) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'contact',data);
  }

  validateUser(email) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'validateUser/'+email);
  }
  getPostDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPostDetails/'+id);
  }
  getNewsDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'newsDetails/'+id);
  }


  //Dont delete
  listRecords() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'domains');
  }

  listRecordsAdmin() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getDomainsAdmin');
  }

  listOrders(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'backorders/'+id);
  }
  deleteBackorder(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteBackorder/'+id);
  }

  listBookings(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'listBookings/'+id);
  }

  addOrder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'order/'+id,data);
  }
  addBackorder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'addBackorder/'+id,data);
  }
  private imageUrl: Subject<any> = new Subject<any>();
  public imageUrl$ = this.imageUrl.asObservable();
  public sendImageUpdate(data: any){
    this.imageUrl.next(data);
}
updateProfileImage(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateProfileImage',jsonPayload);
}
updateUser(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateUser/'+id,jsonPayload);
}

updateCategory(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateCategory/'+id,jsonPayload);
}
updateSubCategory(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateSubCategory/'+id,jsonPayload);
}
subscribeEmail(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'subscribe',jsonPayload);
}
activate(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'activateSubscribe',jsonPayload);
}
listCountries() {
  return this.http.get(AppSettings.API_ENDPOINT  + 'countries');
}

addRecord(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'addDomain',jsonPayload);
}
editRecord(id,jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'editDomain/'+id,jsonPayload);
}
deleteRecord(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteDomain/'+id);
}
getAdminBackorders(){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookingsAdmin');
}

getAdminHandpicked(){
  return this.http.get(AppSettings.API_ENDPOINT + 'adminHandpicked');
}
getHomeContent(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getContent');
}
updateHomeContent(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'homeContent',data);
}
changeUserPassword(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'changeUserPassword',data);
}

getCatAndSub(){
  return this.http.get(AppSettings.API_ENDPOINT + 'catAndSub');
}
subbyId(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'subbyId/'+id);
}
setBookingDetails(data:any){
  localStorage.setItem('setBookingDetailsHandyman',  JSON.stringify(data));
}

getBookingDetails(){
  let details = localStorage.getItem('setBookingDetailsHandyman');
  return JSON.parse(details);
}

setServiceDetails(data:any){
  localStorage.setItem('setServiceDetails',  JSON.stringify(data));
}

getServiceDetails(){
  let details = localStorage.getItem('setServiceDetails');
  return JSON.parse(details);
}
order(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'order',data);
}

setBookingID(data:any){
  localStorage.setItem('setBookingID',  JSON.stringify(data));
}

getBookingID(){
  let details = localStorage.getItem('setBookingID');
  return JSON.parse(details);
}
quoteJob(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'quoteJob',data);
}
validatePin(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'validatePin',data);
}
}