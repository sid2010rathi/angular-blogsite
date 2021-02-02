import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Blog } from '../../models/blog';
import { Route } from '@angular/compiler/src/core';
import { BlogUpdateComponent } from '../blog-update/blog-update.component';
import { UserService } from 'src/app/user.service';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
  providers: [BlogService, BlogUpdateComponent]
})
export class BlogDetailsComponent implements OnInit {

  newBlog: Blog;
  blogid: string;
  newComment: string;
  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.newBlog = new Blog();

    this.route.params.pipe(switchMap((params: Params) => {

      return this.blogService.getSingleBlog(params.blogid);

    }))
      .subscribe((newBlog: Blog) => {
        this.newBlog = newBlog;

      })
  }

  updateBlog(blogid: string) {

    this.router.navigate(["update-blog", blogid]);

  }

  public postComment(): void {
    let date = new Date();
    this.blogService.postComment(this.newBlog._id, this.newComment)
      .then(response => {
        const username = "Anonymous";
        const token = localStorage.getItem("token");
        if (token) {
          this.getSingleUser().then((res: any) => {
            this.newBlog.comments.push({
              _id: '',
              date: date.toString(),
              description: this.newComment,
              author: res.name
            });
            this.newComment = '';
          })
        } else {
          this.newBlog.comments.push({
            _id: '',
            date: date.toString(),
            description: this.newComment,
            author: username
          });
          this.newComment = '';
        }
      });
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

  deleteBlog(blogid: string) {
    this.blogService.deleteBlog(blogid).subscribe(
      response => {
        this.router.navigate([`/`]);
      },
      error => console.log(error)
    )
  }

}
