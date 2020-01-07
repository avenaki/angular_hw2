import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { HttpService } from "../../http.service";

@Injectable()

export class EditStudentGuard implements CanActivate {
  constructor( private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const id = route.params.id;
   const averageScore =  Number(localStorage.getItem(id));
    if ( averageScore !== 5) {
      return true; }
     this.router.navigate([""]);
    return false; }
}
