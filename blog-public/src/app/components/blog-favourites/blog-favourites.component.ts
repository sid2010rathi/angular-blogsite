import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../blog.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-blog-favourites',
  templateUrl: './blog-favourites.component.html',
  styleUrls: ['./blog-favourites.component.css']
})

export class BlogFavouritesComponent implements OnInit {
  blogs: Blog[] = [];
  message: string;
  formError: string;
  constructor(private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getFavouriteBlogs();
  }

  //get favourite blogs based on user id
  private getFavouriteBlogs() {
    this.message = 'Getting your favourite blogs...';
    this.authService.getCurrentUserId()
      .then((userId: string) => {
        this.blogService.getFavourites(userId)
          .then((response: Blog[]) => {
            this.blogs = response;
            this.message = '';
          })
          .catch((error: string) => {
            this.showError(error);
          });
      })
  }

  private showError(error) {
    this.message = error.message;
  }
}
