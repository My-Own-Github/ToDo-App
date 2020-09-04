import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserForm } from 'src/app/shared/user-form.model';
import { UserService } from 'src/app/shared/user.service';
// import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  // userForm: UserForm = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   mobileNo: null
  // }
  private userData: any;
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    console.log("check user for this:", this)
  }

  ngOnInit() {
    this.userData = history.state.data;
    if (this.userData && this.userData._id) {
      this.updateUserData(this.userData)
    }
  }

  userForm = this.fb.group({
    id: [],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    mobileNo: ['', Validators.compose([
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.required])]
  });

  updateUserData(userData: any) {
    this.userForm.controls['id'].setValue(userData._id)
    this.userForm.controls['firstName'].setValue(userData.firstName)
    this.userForm.controls['lastName'].setValue(userData.lastName)
    this.userForm.controls['email'].setValue(userData.email)
    this.userForm.controls['mobileNo'].setValue(userData.mobileNo)
  }

  async saveUserData(form: any) {
    console.log("user form", form)
    if (this.userData && this.userData._id) {
      console.log("updated data", form.value)
      let updateUser: any = await this.userService.updateUser(form.value);
      if (updateUser) {
        this.router.navigate(["homePage"])
      }
    } else {
      let newUser: any = await this.userService.addNewUser(form.value);
      if (newUser) {
        this.router.navigate(["homePage"])
      }
    }
  }

  goBack() {
    this.router.navigate(['homePage'])
  }

}
