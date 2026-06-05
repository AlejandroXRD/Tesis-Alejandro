import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface User {
  userId: string;
  userName: string;
  apellido: string;
  rol: 'ADMIN' | 'PPA' | 'JEFE_COLECTIVO' | 'PROFESOR';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/user');
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`/user/${id}`);
  }

  getUsersByRole(rol: string): Observable<User[]> {
    return this.apiService.get<User[]>(`/user?rol=${rol}`);
  }
}
