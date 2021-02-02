import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { Blog } from '../../models/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
  providers: [BlogService]
})
export class BlogCreateComponent implements OnInit {


  public newBlog : Blog;
  formError: string;

  constructor(private blogservice:BlogService, private router: Router) { }

  ngOnInit(): void {
    this.newBlog = new Blog();
  }


  public createBlog(newBlog: Blog) : void{
    this.blogservice.createBlog(newBlog);
  }
 public formIsValid(): boolean { 

    if (this.newBlog.author && this.newBlog.name && this.newBlog.images){

    return true;

  } 
    else {

    return false;

    }
}

public onReviewSubmit():void {

this.formError = ''; 

if(this.formIsValid()){

 this.formError  = "Data Submitted Succesfully";
 this.router.navigate([`/`]);

} else{

  this.formError = 'All fields are required, Please try again';

}

} 

}



