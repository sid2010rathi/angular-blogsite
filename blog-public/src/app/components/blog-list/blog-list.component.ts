import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BlogService } from 'src/app/blog.service';
import { Blog } from 'src/app/models/blog';
import { Favourites } from 'src/app/models/favourites';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

export class BlogListComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  blogs: Blog[] = [];
  message: string;
  formError: string;
  constructor(private blogService: BlogService, private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getBlogs();
  }

  private getBlogs() {
    this.message = 'Getting blogs...';
    this.blogService.getBlogs()
      .then((response: Blog[]) => {
        const updatedBlogs: Blog[] = response;

        const token = localStorage.getItem("token");
        if (token) {
          //get current user
          this.authService.getCurrentUserId().then((userId: string) => {
            //get user's fav blog
            this.blogService.getFavourites(userId).then((res: Blog[]) => {
              const favBlogs: Blog[] = res;

              for (var i = 0; i < updatedBlogs.length; i++) {
                for (var k = 0; k < favBlogs.length; k++) {
                  if (updatedBlogs[i]._id == favBlogs[k]._id) {
                    updatedBlogs[k].favourites = true;
                    break;
                  }
                }
              }
              this.blogs = updatedBlogs;
              this.message = '';
            }).catch(err => {
              console.log("Error in getFavourites");
            })
          })
        }
        else {
          this.blogs = updatedBlogs;
          this.message = '';
        }
      })
      .catch((error: string) => {
        this.showError(error);
      });
  }

  //Add Blog to favorites
  public addFavourites(blogid: string) {
    this.authService.getCurrentUserId()
      .then((userId: string) => {
        this.blogService.addToFavourites(userId, blogid)
          .then((response: any) => {
            alert('Blog Added to Favourites');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/blogs']);
            });
          })
          .catch((error: string) => {
            this.showError(error);
          });
      })
      .catch((error: string) => {
        this.showError("No user found");
      })
  }

  public removeFavourites(blogid: string) {
    // this.authService.getCurrentUserId()
    //   .then((userId: string) => {
    //     this.blogService.removeFromFavourites(userId, blogid)
    //       .then((response: any) => {
    //         alert('Blog Added to Favourites');
    //       })
    //       .catch((error: string) => {
    //         this.showError(error);
    //       });
    //   })
    //   .catch((error: string) => {
    //     this.showError("No user found");
    //   })
  }

  private showError(error) {
    this.message = error.message;
  }
}
