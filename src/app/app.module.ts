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
import { ProfileComponent } from './User/user-profile/profile.component';
import { ReviewComponent } from './User/user-profile/review/review.component';
import { PurchasesComponent } from './User/user-profile/purchases/purchases.component';
import { FavoritesComponent } from './User/user-profile/favorites/favorites.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ServicesComponent } from './services/services.component';
import { BookComponent } from './services/book/book.component';
import { ServiceProfileComponent } from './common/public-establishment-profile/profile.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HeaderBookCalendarComponent } from './helpers/header-book-calendar/header-book-calendar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmationOfBookComponent } from './helpers/modal-confirmation-of-book/modal-confirmation-of-book.component';
import { FilterPipe } from './helpers/filterPipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingsComponent } from './User/user-profile/bookings/bookings.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalConfirmationOfDeleteBookComponent } from './helpers/modal-confirmation-of-delete-book/modal-confirmation-of-delete-book.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserSignupComponent } from './User/user-signup/user-signup.component';
import { EstablishmentLoginComponent } from './Establishment/establishment-login/establishment-login.component';
import { EstablishmentSignupComponent } from './Establishment/establishment-signup/establishment-signup.component';
import { EstablishmentProfileComponent } from './Establishment/establishment-profile/establishment-profile.component';
import { BooksComponent } from './Establishment/establishment-profile/books/books.component';
import { ServicesAndProductsComponent } from './Establishment/establishment-profile/services-and-products/services-and-products.component';
import { EmployeesComponent } from './Establishment/establishment-profile/employees/employees.component';
import { StatisticsComponent } from './Establishment/establishment-profile/statistics/statistics.component';
import { EditUserInfoComponent } from './User/edit-user-info/edit-user-info.component';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';

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
    ModalConfirmationOfDeleteBookComponent,
    UserLoginComponent,
    UserSignupComponent,
    EstablishmentLoginComponent,
    EstablishmentSignupComponent,
    EstablishmentProfileComponent,
    BooksComponent,
    ServicesAndProductsComponent,
    EmployeesComponent,
    StatisticsComponent,
    EditUserInfoComponent,
    ForgotPasswordComponent
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
