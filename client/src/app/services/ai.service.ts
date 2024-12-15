import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  
  constructor(private readonly http: HttpClient) { }

  getContext = (context: string, words: string[]): Observable<string> => {
    const language = navigator.language;
    return this.http.post<string>(`${ environment.aiServiceURL }/context`, { language, context, words });
  }
}
