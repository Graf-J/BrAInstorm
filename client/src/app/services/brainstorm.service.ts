import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BrainstormResponse } from '../models/responses/brainstormresponse.model';
import { BrainstormRequest } from '../models/requests/brainstormrequest.model';

@Injectable({
  providedIn: 'root'
})
export class BrainstormService {

  constructor(private readonly http: HttpClient) { }

  brainstormExists = (id: string): Observable<boolean> => {
      return this.http.get<boolean>(`${ environment.brainstormServiceURL }/Brainstorm/Exists/${ id }`);
  }

  getBrainstormById = (id: string): Observable<BrainstormResponse> => {
      return this.http.get<BrainstormResponse>(`${ environment.brainstormServiceURL }/Brainstorm/${ id }`);
  }

  getBrainstorms = (): Observable<BrainstormResponse[]> => {
      return this.http.get<BrainstormResponse[]>(`${ environment.brainstormServiceURL }/Brainstorm`);
  }

  addBrainstorm = (brainstorm: BrainstormRequest): Observable<BrainstormResponse> => {
      return this.http.post<BrainstormResponse>(`${ environment.brainstormServiceURL }/Brainstorm`, brainstorm);
  }

  deleteBrainstorm = (id: string) => {
      return this.http.delete(`${ environment.brainstormServiceURL }/Brainstorm/${ id }`);
  }
}
