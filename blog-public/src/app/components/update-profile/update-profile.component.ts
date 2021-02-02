import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  formError: String = '';

  newUser: UserDetails = {
    _id: this.route.snapshot.paramMap.get('userid'),
    dob: '',
    address: '',
    city: '',
    province: '',
    zipcode: '',
    phone: '',
    image: null
  }

  ngOnInit(): void {
    this.getCurrentUser().then((data:any) => {
      this.newUser = data;
    })
  }

  getCurrentUser() {
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

  onUpdate() {
    this.formError = '';
    if(this.formIsValid()) {
      this.userService.updateUser(this.newUser)
        .then((user: any) => {
          if(user){
            if(user.status === "ok") {
              
              this.router.navigate([`/`]);

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
    if (this.newUser.dob && this.newUser.address && this.newUser.city 
      && this.newUser.province && this.newUser.zipcode && this.newUser.phone)
      return true;
    return false;
  }

}
