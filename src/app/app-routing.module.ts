import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ServiceComponent } from './service/service.component';
import { HandymanServicesComponent } from './handyman-services/handyman-services.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompleteBookingComponent } from './complete-booking/complete-booking.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';

import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

import { AdminPrivacyComponent } from './admin/admin-privacy/admin-privacy.component';
import { AdminTermsComponent } from './admin/admin-terms/admin-terms.component';
import { AdminCmsComponent } from './admin/admin-cms/admin-cms.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthGuardAdmin } from './auth/auth.guard.admin';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSubcategoriesComponent } from './admin/admin-subcategories/admin-subcategories.component';
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
import { NotFoundComponent } from './not-found/not-found.component'
import { BecomeProComponent } from './become-pro/become-pro.component';
import { AdminPostalComponent } from './admin/admin-postal/admin-postal.component';
const routes: Routes = [
  {  
    
  path: '',
  component: SiteLayoutComponent,
  children: [{
    path: '',
    component: HomeComponent
   },{
    path: 'login',
    component: LoginComponent
   },{
    path: 'register',
    component: RegisterComponent
   },{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
   },{
    path: 'forget-password',
    component: ForgetPasswordComponent
   },{
    path: 'pro',
    component: BecomeProComponent
   },{
    path: 'services/:id/:serviceId',
    component: ServiceComponent
   },{
    path: 'services',
    component: HandymanServicesComponent
   },{
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard],
   },{
    path: 'change-user-password',
    component: ChangeUserPasswordComponent,
    canActivate:[AuthGuard],
   },{
    path: 'reset-password/:id',
    component: ChangePasswordComponent
   },{
    path: 'complete-booking',
    component: CompleteBookingComponent
   },{
    path: 'confirmation',
    component: ConfirmationComponent
   },{
    path: 'confirm-account/:id',
    component: ConfirmAccountComponent
   },{
    path: 'support',
    component: ContactUsComponent
   },{
    path: 'about',
    component: AboutUsComponent
   },{
    path: 'terms',
    component: TermsComponent
   },{
    path: 'privacy',
    component: PrivacyComponent
   },{
    path: 'faq',
    component: FaqsComponent
   },{
    path: 'how-it-works',
    component: HowComponent
   },{
    path: 'learn-more',
    component: LearnMoreComponent
   }]

  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'admin/dashboard',
      component: AdminHomeComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/postal-codes',
      component: AdminPostalComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/support-fee',
      component: SupportFeeComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/users',
      component: AdminUsersComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    }, {
      path: 'admin/bookings',
      component: AdminBookingsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/privacy',
      component: AdminPrivacyComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/terms',
      component: AdminTermsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/cms',
      component: AdminCmsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/about-us',
      component: AdminAboutComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/faq',
      component: AdminFaqsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/how-it-works',
      component: AdminHowComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/categories',
      component: AdminCategoriesComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/learn-more',
      component: AdminLearnMoreComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    
    {
      path: 'admin/subcategories/:id',
      component: AdminSubcategoriesComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
  ]},
  {
    
    path: 'admin/login',
    component: AdminLoginComponent
   }, 
   {  path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
