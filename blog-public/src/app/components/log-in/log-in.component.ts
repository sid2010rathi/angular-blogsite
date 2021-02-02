import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  formError: String = '';

  newUser: Users = {
    _id: '',
    name: null,
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.formError = '';
    if(this.formIsValid()) {
      const res = this.authService.login(this.newUser);
      console.log(res)
      if(res !== null){
        this.formError = res;
      }
    } else {
      this.formError = 'All fields required. Please, try again!';
    }
  }

  private formIsValid(): boolean {
    if (this.newUser.email && this.newUser.password)
      return true;
    return false;
  }

}
