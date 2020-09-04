import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  profile: any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem("profile"))
  }

  AddNewUser(){
    this.router.navigate(["homePage/userForm"])
  }

}
