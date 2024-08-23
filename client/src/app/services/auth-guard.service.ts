import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

// export class AuthGuardService implements CanActivate {

//   constructor(private auth:AuthService, private router: Router, private notificationService:NotificationService) { }

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

//     console.log('next',next);

//     let token = this.auth.decryptToken();
//     let tokenExp = token.exp*1000;

//     if(Date.now() < tokenExp){

//       // validating token only, good token foward along route.
//     if(next.data.role == 'tokenonly'){
//       return true;
//     }

//     if(next.data.role == 'captain'){
//       return !!this.auth.getCaptain();
//     }

//     // caster route gaurd
//     if (next.data.role == 'caster'){

//       if(this.auth.getCaster()){
//         return true;
//       }
//     } else if (next.data.role == undefined || next.data.role == null){
//       if (this.auth.getAdmin()){
//         return true;
//       }
//     }else if (this.auth.getAdmin().indexOf(next.data.role)>-1){
//       return true;
//     }
//     // navigate to login page
//     this.router.navigate(['/noAccess/', next.data.role]);
//     // you can save redirect url so after authing we can move them back to the page they requested
//     return false;
//     }else{
//       this.auth.destroyAuth('/');
//       this.notificationService.subj_notification.next('Your token has expired.');
//     }


//   }
// }
export const ngsSecCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>{
  const auth = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

    let token = auth.decryptToken();
    let tokenExp = token.exp*1000;

    if(Date.now() < tokenExp){

      // validating token only, good token foward along route.
    if(route.data.role == 'tokenonly'){
      return true;
    }

    if(route.data.role == 'captain'){
      return !!auth.getCaptain();
    }

    // caster route gaurd
    if (route.data.role == 'caster'){

      if(auth.getCaster()){
        return true;
      }
    } else if (route.data.role == undefined || route.data.role == null){
      if (auth.getAdmin()){
        return true;
      }
    }else if (auth.getAdmin().indexOf(route.data.role)>-1){
      return true;
    }
    // navigate to login page
    router.navigate(['/noAccess/', route.data.role]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
    }else{
      auth.destroyAuth('/');
      notificationService.subj_notification.next('Your token has expired.');
    }
}
