import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { OverDirectiveDirective } from './helpers/over-directive.directive';
import { FooterComponent } from './common/footer/footer.component';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { MainViewComponent } from './common/main-view/main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './user-profile/profile.component';
import { ReviewComponent } from './user-profile/review/review.component';
import { PurchasesComponent } from './user-profile/purchases/purchases.component';
import { FavoritesComponent } from './user-profile/favorites/favorites.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ServicesComponent } from './services/services.component';
import { BookComponent } from './services/book/book.component';
import { ServiceProfileComponent } from './services/profile/profile.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HeaderBookCalendarComponent } from './helpers/header-book-calendar/header-book-calendar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmationOfBookComponent } from './helpers/modal-confirmation-of-book/modal-confirmation-of-book.component';
import { FilterPipe } from './helpers/filterPipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingsComponent } from './user-profile/bookings/bookings.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalConfirmationOfDeleteBookComponent } from './helpers/modal-confirmation-of-delete-book/modal-confirmation-of-delete-book.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    HeaderComponent,
    OverDirectiveDirective,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    MainViewComponent,
    ProfileComponent,
    ReviewComponent,
    PurchasesComponent,
    FavoritesComponent,
    ServicesComponent,
    BookComponent,
    ServiceProfileComponent,
    HeaderBookCalendarComponent,
    ModalConfirmationOfBookComponent,
    BookingsComponent,
    ModalConfirmationOfDeleteBookComponent
  ],
  imports: [
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AccordionModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ModalModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
