import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment } from '../../environments/environment'
import { Login } from './login.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  loginUser: Login = {
    email: '',
    password: ''
  };

  constructor( private http: HttpClient, private router: Router) { }

  registerUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/register', user)
  }

  loginNewUser(loginForm: Login){
    return this.http.post(environment.apiBaseUrl + '/authenticate', loginForm)
  }

  async getUserProfile(data:any, res:any){
    // return this.http.post(environment.apiBaseUrl + '/me', data)
    let url = environment.apiBaseUrl + '/me';
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': res.token
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, config);
        const resData = await response.json();
        if (resData) {
           console.log("profile", resData.data)
           localStorage.setItem("profile", JSON.stringify(resData.data))
           this.router.navigate(["homePage"])
        }
    } catch (e) {
        console.log('[Server Error]')
    }
  }
  getUserList() {
    return this.http.get(environment.apiBaseUrl + '/userLists')
  }

  async updateUser(userData:any) {
    let url = environment.apiBaseUrl + '/user/' + userData.id;
    const config = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': res.token
        },
        body: JSON.stringify(userData)
    };
    try {
        const response = await fetch(url, config);
        const resData = await response.json();
        if (resData) {
           console.log("user", resData)
           return resData;
        }
    } catch (e) {
        console.log('[Server Error]')
    }
  }

  async deleteUser(userId: string) {
    let url = environment.apiBaseUrl + '/user/' + userId;
    const config = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': res.token
        }
    };
    try {
        const response = await fetch(url, config);
        const resData = await response.json();
        if (resData) {
           console.log("delete user", resData)
           return resData;
        }
    } catch (e) {
        console.log('[Server Error]')
    }
  }

  async addNewUser(data:any) {
    let url = environment.apiBaseUrl + '/addUser';
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': res.token
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, config);
        const resData = await response.json();
        if (resData) {
          console.log("add user data", resData)
          return resData;
        }
    } catch (e) {
        console.log('[Server Error]')
    }
  }
}
