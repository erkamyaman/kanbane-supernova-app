import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  constructor(private http: HttpClient) { }
  getTasks(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/tasks`);
  }

  createTask(task: any) {
    return this.http.post<any>(`${environment.apiUrl}/tasks`, task);
  }

  getColumns(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/columns`)
  }
}
