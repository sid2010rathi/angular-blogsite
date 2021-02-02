import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from './models/user-details';
import { Users } from './models/users';

import { BASEURL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUser(newUser: Users) {
    const url = `${BASEURL}/users/create`;
    return this.http.post(url, newUser)
      .toPromise()
      .then(function(response) {
        return response;
      })
      .catch(this.handleError);
  }

  updateUser(newUser: UserDetails) {
    const url = `${BASEURL}/users/update/${newUser._id}`;
    return this.http.put(url, newUser)
      .toPromise()
      .then(function(response) {
        return response;
      })
      .catch(this.handleError);
  }

  login(newUser: Users) {
    const url = `${BASEURL}/users/login`;
    return this.http.post(url, newUser)
      .toPromise()
      .then(function(response) {
        return response;
      })
      .catch(this.handleError);
  }

  getUser(token: any) {
    const url = `${BASEURL}/users/${token}`;
    return this.http.get(url)
      .toPromise()
      .then(function(response) {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error) {
    console.log(error);
  }

  constructor(private http : HttpClient) { }
}
