import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  showSuccessMessage: boolean;
  serverSideMessages: string;
  constructor( private userService: UserService,
              private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit( form : NgForm){
    this.userService.registerUser( form.value).subscribe(
      res =>{
        this.showSuccessMessage = true;
        localStorage.setItem("profile", JSON.stringify(res))
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form)
        this.router.navigate(['homePage'])
      },
      err =>{
        if(err.status === 422)
          this.serverSideMessages = err.error.join('<br/>')
          else {
            this.serverSideMessages = 'Something went wrong. Please contact admin.';
          }
      }
    )
  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverSideMessages = '';
  }

}
