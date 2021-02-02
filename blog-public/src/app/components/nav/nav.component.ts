import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;    
  userid: string;
  username: string;
  isCollapsed = true;
  focus;
  focus1;
  focus2;

  constructor(private authService: AuthService, private userService: UserService) { }
  
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getSingleUser().then((data: any) => {
      this.userid = data._id;
      this.username = data.name;
    })
  }

  onLogout(){
    this.authService.logout();
  }

  getSingleUser() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      if (token) {
        this.userService.getUser(token)
          .then((user: any) => {
            if (user) {
              resolve(user.data);
            }
          })
          .catch((res) => {
            reject(res);
            return;
          })
      }
    })
  }
}