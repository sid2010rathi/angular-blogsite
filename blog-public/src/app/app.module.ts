import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./components/index/index.component";
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserService } from './user.service';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BlogFavouritesComponent } from './components/blog-favourites/blog-favourites.component';
import { BlogAddCommentsComponent } from './components/blog-add-comments/blog-add-comments.component';
import { SearchPipe } from './search.pipe';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    FrameworkComponent,
    IndexComponent,
    NavComponent,
    FooterComponent,
    SearchComponent,
    BlogListComponent,
    RegisterPageComponent,
    UpdateProfileComponent,
    LogInComponent,
    BlogFavouritesComponent,
    BlogAddCommentsComponent,
    SearchPipe,
    BlogCreateComponent,
    BlogUpdateComponent,
    BlogDetailsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    // UserService,
    AuthService, 
    AuthGuard
  ],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
