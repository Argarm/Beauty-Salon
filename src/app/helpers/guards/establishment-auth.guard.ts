import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EstablishmentAccountService } from '../services/establishment-account.service';

@Injectable({ providedIn: 'root' })
export class EstablishmentAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private establishmentAccountService: EstablishmentAccountService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const establishment = this.establishmentAccountService.establishmentValue;
        if (establishment) {
            return true;
        }

        
        this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        return false;
    }

    
}