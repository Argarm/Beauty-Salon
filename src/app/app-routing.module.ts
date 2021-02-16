import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import { CalendarComponent } from './profile/calendar/calendar.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchasesComponent } from './profile/purchases/purchases.component';
import { ReviewComponent } from './profile/review/review.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard],children: [
    {path: "", component: CalendarComponent},
    {path: "review", component: ReviewComponent},
    {path: "purchase", component: PurchasesComponent},
    {path: "favorites",component: FavoritesComponent}
  ]},
  {path: "", component: MainViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
