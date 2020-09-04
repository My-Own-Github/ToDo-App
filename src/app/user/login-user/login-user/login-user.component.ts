import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
  providers: [UserService]
})
export class LoginUserComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }
  showSuccessMessage: boolean;
  serverSideMessages: string;
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.loginNewUser(form.value).subscribe(
      (res:any) => {
        console.log(res)
        if(res.token){
          this.userService.getUserProfile(form.value, res)
        }
        this.resetForm(form);
      },
      err => {
        if (err.status === 422)
          this.serverSideMessages = err.error.join('<br/>')
        else if(err.status === 404){
          this.router.navigate(["signUp"])
        }
      }
    )
  }

  resetForm(form: NgForm) {
    this.userService.loginUser = {
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverSideMessages = '';
  }

}
