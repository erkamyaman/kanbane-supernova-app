import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Column {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  constructor(private http: HttpClient) { }

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${environment.apiUrl}/columns`);
  }

  createColumn(column: Omit<Column, 'id'>): Observable<Column> {
    return this.http.post<Column>(`${environment.apiUrl}/columns`, column);
  }

  updateColumn(id: string, column: Partial<Column>): Observable<Column> {
    return this.http.patch<Column>(`${environment.apiUrl}/columns/${id}`, column);
  }

  deleteColumn(id: string): Observable<Column> {
    return this.http.delete<Column>(`${environment.apiUrl}/columns/${id}`);
  }
}
