import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from '../services/shop.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardBookGuard implements CanActivate {
  constructor(private shopService  : ShopService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var document = this.shopService.getDocument()
      var collection = this.shopService.getCollection()

      if(document == null || collection == null){
        return false
      }else{
        return true;
      }

  }
  
}
