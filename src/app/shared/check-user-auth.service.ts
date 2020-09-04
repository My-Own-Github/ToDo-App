import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUserAuthService {

  constructor() { }

  isUserLogin(){
    let profile = JSON.parse(localStorage.getItem('profile'));
    if(profile && profile._id){
      return true;
    } else {
      return false;
    }
  }
}
