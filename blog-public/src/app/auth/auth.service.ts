import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  login(newUser: Users): String {
    this.userService.login(newUser)
      .then((res: any) => {
        if (res) {
          if (res.status === "ok") {
            localStorage.setItem('token', res.data.token);
            this.loggedIn.next(true);
            this.router.navigate([`/`]);
          } else if (res.status === "error") {
            return res.error;
          }
        } else {
          return 'Ops, something went wrong. Please, try later!';
        }
      });
    return null;
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // get current logged in user id
  getCurrentUserId() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      if (token) {
        this.userService.getUser(token)
          .then((user: any) => {
            if (user) {
              resolve(user.data._id);
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
