import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params } from '@angular/router';
import { Blog } from '../../models/blog';
import {BlogService} from '../../blog.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css'],
  providers:[BlogService]
})
export class BlogUpdateComponent implements OnInit {

  blog: Blog;
  blogid: string;
  formError: string;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {

      this.blog = new Blog();
      this.blogid = this.route.snapshot.params["blogid"];

      this.blogService.getSingleBlog(this.blogid);

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.blogService.getSingleBlog(params['blogid'])
        })
        )
        .subscribe((blog: Blog) => {
          this.blog = blog;
          
        });
  }
  updateBlog(blog : Blog){

    this.blogService.updateBlog(this.blogid,blog).then(res => {
      this.router.navigate([`blogs/`+this.blogid]);
    });
  }
  public formIsValid(): boolean { 

    if (this.blog.author && this.blog.name && this.blog.images){

    return true;

  } 
    else {

    return false;

    }
}

public onReviewSubmit():void {

this.formError = ''; 

if(this.formIsValid()){

 this.formError  = "Data Updated Succesfully";
 //this.router.navigate([`/`]);

} else{

  this.formError = 'All fields are required, Please try again';

}

} 

}
