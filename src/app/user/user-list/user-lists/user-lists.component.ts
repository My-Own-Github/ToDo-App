import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {
  userList: Array<object>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserList().subscribe((userLst:any) => {
      this.userList = userLst;
      console.log("userList", this.userList)
    })
  }

  updateUserData(user: any) {
    this.router.navigate(["/homePage/userForm"], { state: { "data": user } });
  }

  async removedUser(user: any) {
    let res: any = await this.userService.deleteUser(user._id)
    if(res){
      let index:any = this.userList.indexOf(user);
      this.userList.splice(index, 1);
    }
  }

  setUserImage(user){
    return `https://joeschmoe.io/api/v1/${user.firstName}`;
  }

}
