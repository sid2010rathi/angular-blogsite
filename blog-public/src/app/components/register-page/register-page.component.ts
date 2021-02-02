import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  formError: String = '';

  newUser: Users = {
    _id: '',
    name: '',
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.formError = '';
    if(this.formIsValid()) {
      this.userService.registerUser(this.newUser)
        .then((user: any) => {
          if(user){
            if(user.status === "ok") {
              
              this.router.navigate([`/update/${user.data._id}`])

            } else if(user.status === "error"){

              this.formError = user.error;
              
            }
          } else {
            this.formError = 'Ops, something went wrong. Please, try later!';
          }

        });
    } else {
      this.formError = 'All fields required. Please, try again!';
    }
  }

  private formIsValid(): boolean {
    if (this.newUser.name && this.newUser.email && this.newUser.password)
      return true;
    return false;
  }

}
