import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardBookGuard } from './helpers/guards/book.guard';
import { UserAuthGuard } from './helpers/guards/user-auth.guard';
import { EstablishmentAuthGuard} from './helpers/guards/establishment-auth.guard'
import { LoginComponent } from './common/login/login.component';
import { MainViewComponent } from './common/main-view/main-view.component';
import { FavoritesComponent } from './User/user-profile/favorites/favorites.component';
import { ProfileComponent } from './User/user-profile/profile.component';
import { PurchasesComponent } from './User/user-profile/purchases/purchases.component';
import { ReviewComponent } from './User/user-profile/review/review.component';
import { BookComponent } from './services/book/book.component';
import { ServiceProfileComponent } from './common/public-establishment-profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './common/signup/signup.component';
import { BookingsComponent } from './User/user-profile/bookings/bookings.component';
import { EstablishmentProfileComponent } from './Establishment/establishment-profile/establishment-profile.component';
import { BooksComponent } from './Establishment/establishment-profile/books/books.component';
import { EmployeesComponent } from './Establishment/establishment-profile/employees/employees.component';
import { ServicesAndProductsComponent } from './Establishment/establishment-profile/services-and-products/services-and-products.component';
import { StatisticsComponent } from './Establishment/establishment-profile/statistics/statistics.component';

const routes: Routes = [
  {path: "iniciar_sesion", component: LoginComponent},
  {path: "registro", component: SignupComponent},
  {path: "perfil", component: ProfileComponent, canActivate: [UserAuthGuard],children: [
    {path: "", component: BookingsComponent},
    {path: "reseñas", component: ReviewComponent},
    {path: "compras", component: PurchasesComponent},
    {path: "favoritos",component: FavoritesComponent}
  ]},
  {path: "perfil-establecimiento", component: EstablishmentProfileComponent, canActivate: [EstablishmentAuthGuard], children: [
    {path: "", component: BooksComponent},
    {path: "empleados", component: EmployeesComponent},
    {path: "servicios-y-productos", component: ServicesAndProductsComponent},
    {path: "estadísticas",component: StatisticsComponent}
  ] },
  { path: "servicios/:servicio", component: ServicesComponent},
  { path: "servicios/:servicio/:nombre_servicio", component: ServiceProfileComponent, canActivate: [AuthGuardBookGuard]},
  {path: "servicios/:servicio/:nombre_servicio/reservar", component: BookComponent, canActivate: [AuthGuardBookGuard , UserAuthGuard]},
  {path: "", component: MainViewComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
