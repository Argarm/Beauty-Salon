import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardBookGuard } from './helpers/guards/book.guard';
import { AuthGuard } from './helpers/guards/user-auth.guard';
import { LoginComponent } from './common/login/login.component';
import { MainViewComponent } from './common/main-view/main-view.component';
import { FavoritesComponent } from './user-profile/favorites/favorites.component';
import { ProfileComponent } from './user-profile/profile.component';
import { PurchasesComponent } from './user-profile/purchases/purchases.component';
import { ReviewComponent } from './user-profile/review/review.component';
import { BookComponent } from './services/book/book.component';
import { ServiceProfileComponent } from './common/public-establishment-profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './common/signup/signup.component';
import { BookingsComponent } from './user-profile/bookings/bookings.component';

const routes: Routes = [
  {path: "iniciar_sesion", component: LoginComponent},
  {path: "registro", component: SignupComponent},
  {path: "perfil", component: ProfileComponent, canActivate: [AuthGuard],children: [
    {path: "", component: BookingsComponent},
    {path: "reseñas", component: ReviewComponent},
    {path: "compras", component: PurchasesComponent},
    {path: "favoritos",component: FavoritesComponent}
  ]},
  { path: "servicios/:servicio", component: ServicesComponent},
  { path: "servicios/:servicio/:nombre_servicio", component: ServiceProfileComponent, canActivate: [AuthGuardBookGuard]},
  {path: "servicios/:servicio/:nombre_servicio/reservar", component: BookComponent, canActivate: [AuthGuardBookGuard , AuthGuard]},
  {path: "", component: MainViewComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
