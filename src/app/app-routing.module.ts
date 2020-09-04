import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginUserComponent } from './user/login-user/login-user/login-user.component';
import { HomePageComponent } from './user/home-page/home-page/home-page.component';
import { UserAuthGuard } from './user-auth.guard';
import { UserFormComponent } from './user/user-form/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'homePage', component: HomePageComponent, canActivate:[UserAuthGuard]
  },
  {
    path: '', redirectTo: '/homePage', pathMatch: 'full'
  },
  // {
  //   path: 'signUp', component: UserComponent,
  //   children: [{ path: '', component: SignUpComponent}]
  // },
  {
    path: 'signUp', component: SignUpComponent,
    // children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', pathMatch: 'full', component: LoginUserComponent
  },
  {
    path:'homePage/userForm', component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
