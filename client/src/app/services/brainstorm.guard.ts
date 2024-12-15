import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { BrainstormService } from './brainstorm.service';
import { BrainstormResponse } from '../models/responses/brainstormresponse.model';

@Injectable({
  providedIn: 'root'
})
export class BrainstormGuard implements CanActivate {
  constructor(private brainstormService: BrainstormService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id: string = route.params['id'];
    return this.brainstormService.brainstormExists(id);
  }
  
}
