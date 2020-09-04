import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginUserComponent } from './user/login-user/login-user/login-user.component';
import { HomePageComponent } from './user/home-page/home-page/home-page.component';
import { UserAuthGuard } from './user-auth.guard';
import { CheckUserAuthService } from './shared/check-user-auth.service';
import { UserListsComponent } from './user/user-list/user-lists/user-lists.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { UserFormComponent } from './user/user-form/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    LoginUserComponent,
    HomePageComponent,
    UserListsComponent,
    UserFormComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserAuthGuard, CheckUserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
