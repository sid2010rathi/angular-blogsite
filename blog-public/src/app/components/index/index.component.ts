import { Component, OnInit, OnDestroy, Renderer2, Inject, HostListener } from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from '@angular/common';

import { UserService } from 'src/app/user.service';

@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;

  constructor(private userService: UserService, private renderer: Renderer2,
    public location: Location,
    @Inject(DOCUMENT) document) { }
  @HostListener("window:scroll", ["$event"])

  scrollToDownload(element: any) {
    // element.scrollIntoView({ behavior: "smooth" });
  }
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    this.getUserinfo();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  getUserinfo() {
    const token = localStorage.getItem("token");
    if(token) {
      this.userService.getUser(token).then((user : any) => {
        if(user) {
          //use this data for user ptofile
          // do not show register and login tab
        } else {
          //show register and login tab
        }
      })
    }
  }
}
