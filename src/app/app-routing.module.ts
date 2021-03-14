import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardBookGuard } from './helpers/auth-guard-book.guard';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import { CalendarComponent } from './profile/calendar/calendar.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchasesComponent } from './profile/purchases/purchases.component';
import { ReviewComponent } from './profile/review/review.component';
import { BookComponent } from './services/book/book.component';
import { ServiceProfileComponent } from './services/profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "iniciar_sesion", component: LoginComponent},
  {path: "registro", component: SignupComponent},
  {path: "perfil", component: ProfileComponent, canActivate: [AuthGuard],children: [
    {path: "", component: CalendarComponent},
    {path: "reseñas", component: ReviewComponent},
    {path: "compras", component: PurchasesComponent},
    {path: "favoritos",component: FavoritesComponent}
  ]},
  { path: "servicios/:servicio", component: ServicesComponent},
  { path: "servicios/:servicio/:nombre_servicio", component: ServiceProfileComponent, canActivate: [AuthGuardBookGuard]},
  {path: "servicios/:servicio/:nombre_servicio/reservar", component: BookComponent, canActivate: [AuthGuardBookGuard /*, AuthGuard*/]},
  {path: "", component: MainViewComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
