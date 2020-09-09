import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AppSettings } from './../../constants';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  getListUsers() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/getListUsers');
  }
  getListUsersAdmin() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/getListUsersAdmin');
  }
  getListPosts() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/getListPosts');
  } 
 
  getCount() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/count');
  } 
  
  registerUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/register',jsonPayload);
  }
  updateUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateUser',jsonPayload);
  }
  updateUserAdmin(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateUserAdmin',jsonPayload);
  }

  updateAdmin(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateAdmin',jsonPayload);
  }
  
  deleteUser(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/deleteUser/'+id);
  } 
  deleteQuote(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteQuote/'+id);
  } 
  getListQuotes() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getListQuotes');
  } 
  
  deleteCategory(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/deleteCategory/'+id);
  } 
  

  login(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/login',jsonPayload);
  }
  setToken(token: string) {
    localStorage.setItem('tokenAdmin', token);
  }
  deleteToken() {
    localStorage.removeItem('tokenAdmin');
  }
  getToken() {
    return localStorage.getItem('tokenAdmin');
  }
  
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
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
  setAdminDetails(data:any){
    localStorage.setItem('adminDetailsHandy',  JSON.stringify(data));
  }
  getAdminDetails(){
    let details = localStorage.getItem('adminDetailsHandy');
    return JSON.parse(details);
  }
  deleteAdminDetails() {
    localStorage.removeItem('adminDetailsHandy');
  }

  changePostStatus(id,status) {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/changePostStatus/'+id+'/'+status);
  } 
 
    
  deleteSubCat(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/deleteSub/'+id);
  } 
  

  addPrivacy(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addPrivacy',jsonPayload);
  }
  addLearnMore(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addLearnMore',jsonPayload);
  }

  addSuportFee(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addSuportFee',jsonPayload);
  }

  getSupportFee():Observable<any>{
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/getSupportFee');
  }

  addTerms(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addTerms',jsonPayload);
  }
  privacy() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/privacy');
  }
  learnMore() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/learnMore');
  }

  terms() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/terms');
  }
  about() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/about');
  }

  addAbout(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addAbout',jsonPayload);
  }
  
  updateReviewEqp(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateReviewEqp',jsonPayload);
  }

  updateEq(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateEq',jsonPayload);
  }

  resendMailActivation(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/resendMailActivation',jsonPayload);
  }

  getCategories() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/listCategories');
  }

  getSubCategories(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/getSubCategories/'+id);
  }


  addFaq(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addFaq',jsonPayload);
  }
  addHow(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addHow',jsonPayload);
  }
  faq() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/faq');
  }

  how() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/how');
  }

  postalCodes() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/postalCodes');
  }
  addPostalCode(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addPostalCode',jsonPayload);
  }
  updatePostalcode(jsonPayload,id):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updatePostalcode/'+id,jsonPayload);
  }

  deletePostalCode(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/deletePostalCode/'+id);
  } 
  
}