import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './models/blog';

import { BLOGS_URL, USERS_URL } from './global';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  
  getBlogs() {
    return this.http.get(BLOGS_URL)
    .toPromise()
    .then((response: Blog[]) =>  response)
    .catch(this.handleError);
  }

  getSingleBlog(blogId: string): Promise<void | Blog> {
    return this.http.get(BLOGS_URL + '/' + blogId)
      .toPromise()
      .then(res => res as Blog)
      .catch(this.handleError);
  }

  createBlog(newBlog: Blog): Promise<void | Blog> {
    return this.http.post(BLOGS_URL, newBlog)
      .toPromise()
      .then(response => response as Blog)
      .catch(this.handleError);
  }

  updateBlog(blogId: string, newBlog: Blog): Promise<void | Blog> {
    return this.http.put(BLOGS_URL + '/' + blogId, newBlog)
      .toPromise()
      .then(response => response as Blog)
      .catch(this.handleError);
  }
  postComment(blogId: string, comment: string): Promise<void | Blog> {

    return this.http.post(BLOGS_URL + '/' + blogId + '/comment', {comment: comment})
    .toPromise()
    .then(response => response as Blog)
    .catch(this.handleError);
    
  }

  deleteBlog(blogId: string){
    
    return this.http.delete(BLOGS_URL + '/' + blogId);
   
  }
  // addFavourites(blogId : string, newBlog: Blog): Promise<void | Blog>{

  //   return this.http.put(BLOGS_URL + '/' + blogId + '/fav', newBlog)
  //   .toPromise()
  //   .then(response => response as Blog)
  //     .catch(this.handleError);
  // }



  createBlogFavourites(newBlog: Blog): Promise<void | Blog> {
    return this.http.post(BLOGS_URL+'/favourites', newBlog)
      .toPromise()
      .then(response => response as Blog)
      .catch(this.handleError);
  }

  addToFavourites(userid: string, blogid: string){
    const data = {
      userid, blogid
    }
    return this.http.post(USERS_URL+'/favourites', data)
    .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  getFavourites(userid: string) {
    return this.http.get(USERS_URL+'/favourites/'+userid)
    .toPromise()
    .then((response) =>  response)
    .catch(this.handleError);
  }

  removeFromFavourites(userid: string, blogid: string){
    // const data = {
    //   userid, blogid
    // }
    // return this.http.delete(USERS_URL+'/favourites', data)
    // .toPromise()
    //   .then(response => response as any)
    //   .catch(this.handleError);
  }

  private handleError(error) {
    console.log(error);
  }
}
