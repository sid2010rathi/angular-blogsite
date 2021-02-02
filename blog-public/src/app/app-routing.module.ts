import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogAddCommentsComponent } from './components/blog-add-comments/blog-add-comments.component';
import { BlogFavouritesComponent } from './components/blog-favourites/blog-favourites.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';

import {BlogCreateComponent} from './components/blog-create/blog-create.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';

import { IndexComponent } from "./components/index/index.component";
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  //user
  { path: '', component: IndexComponent},
  { path: 'register', component: RegisterPageComponent },
  { path: 'update/:userid', component: UpdateProfileComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LogInComponent },
  
  //blog
  { path: 'blogs', component: BlogListComponent},
  { path: 'blogs/favourites', component: BlogFavouritesComponent, canActivate: [AuthGuard] },
  { path: 'blogs/:blogid/comments/new', component: BlogAddCommentsComponent, canActivate: [AuthGuard] },
  { path: 'update-blog/:blogid', component: BlogUpdateComponent, canActivate: [AuthGuard] },
  { path: 'blogs/new', component: BlogCreateComponent, canActivate: [AuthGuard] },
  { path: 'blogs/:blogid', component: BlogDetailsComponent},
  // { path: 'blogs/edit/:blogid', component: BlogCreateComponent },

  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }