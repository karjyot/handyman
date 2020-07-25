import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderConfig, NgxUiLoaderService,SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from "./services/login.service";
import { AuthGuard } from './auth/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ServiceComponent } from './service/service.component';
import { HandymanServicesComponent } from './handyman-services/handyman-services.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { MaterialModule } from './material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CompleteBookingComponent } from './complete-booking/complete-booking.component';
import { OnlyNumber } from './onlynumber.directive';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminCmsComponent } from './admin/admin-cms/admin-cms.component';
import { AdminPrivacyComponent } from './admin/admin-privacy/admin-privacy.component';
import { AdminTermsComponent } from './admin/admin-terms/admin-terms.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSubcategoriesComponent } from './admin/admin-subcategories/admin-subcategories.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component'
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AdminFaqsComponent } from './admin/admin-faqs/admin-faqs.component';
import { HowComponent } from './how/how.component';
import { AdminHowComponent } from './admin/admin-how/admin-how.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { AdminLearnMoreComponent } from './admin/admin-learn-more/admin-learn-more.component';
import { SupportFeeComponent } from './admin/support-fee/support-fee.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { NotFoundComponent } from './not-found/not-found.component';
import { BecomeProComponent } from './become-pro/become-pro.component';
import { AdminPostalComponent } from './admin/admin-postal/admin-postal.component';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  fgsType: SPINNER.ballSpinFadeRotating,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
};
@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    ServiceComponent,
    HandymanServicesComponent,
    UserBookingsComponent,
    ProfileComponent,
    ChangePasswordComponent,
    CompleteBookingComponent,
    OnlyNumber,
    ConfirmationComponent,
    ContactUsComponent,
    ChangeUserPasswordComponent,
    ConfirmAccountComponent,
    AdminLoginComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminCmsComponent,
    AdminPrivacyComponent,
    AdminTermsComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    AdminBookingsComponent,
    AdminCategoriesComponent,
    AdminSubcategoriesComponent,
    AdminAboutComponent,
    AboutUsComponent,
    TermsComponent,
    PrivacyComponent,
    FaqsComponent,
    AdminFaqsComponent,
    HowComponent,
    AdminHowComponent,
    LearnMoreComponent,
    AdminLearnMoreComponent,
    SupportFeeComponent,
    NotFoundComponent,
    BecomeProComponent,
    AdminPostalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({progressBar:true,preventDuplicates: true,timeOut:5000}), 
    ModalModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxPageScrollModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AngularEditorModule,
    SocialLoginModule
    
  ],
  providers: [AuthGuard,LoginService,CookieService,NgxUiLoaderService,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '802460331131-2btn846epcc7e9rcaa7i7fkaln3aoke5.apps.googleusercontent.com'
          ),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('625122134791312'),
        },
       
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
