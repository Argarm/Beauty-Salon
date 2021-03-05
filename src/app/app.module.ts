import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OverDirectiveDirective } from './helpers/over-directive.directive';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { backendProvider } from './helpers/backend';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './profile/calendar/calendar.component';
import { ReviewComponent } from './profile/review/review.component';
import { PurchasesComponent } from './profile/purchases/purchases.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ServicesComponent } from './services/services.component';
import { BookComponent } from './services/book/book.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverDirectiveDirective,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    MainViewComponent,
    ProfileComponent,
    CalendarComponent,
    ReviewComponent,
    PurchasesComponent,
    FavoritesComponent,
    ServicesComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    backendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
