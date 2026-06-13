import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface User {
  userId: string;
  userName: string;
  apellido: string;
  rol: 'ADMIN' | 'PPA' | 'JEFE_COLECTIVO' | 'PROFESOR' | 'CLIENTE';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  // ✅ CAMBIAR DE /api/users A /user
  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/user');  // ← Sin /api
  }

  // ✅ CAMBIAR DE /api/users/:id A /user/:id
  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`/user/${id}`);  // ← Sin /api
  }

  // ✅ CAMBIAR
  getUsersByRole(rol: string): Observable<User[]> {
    return this.apiService.get<User[]>(`/user?rol=${rol}`);  // ← Sin /api
  }

  // ✅ CAMBIAR
  updateUserRole(userId: string, rol: User['rol']): Observable<User> {
    return this.apiService.patch<User>(`/user/${userId}`, { rol });  // ← Sin /api
  }
}