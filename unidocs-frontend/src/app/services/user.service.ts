import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface User {
  userId: string;
  userName: string;
  apellido: string;
  rol: 'ADMIN' | 'DECANO_VICEDECANO' | 'JEFE_DEPARTAMENTO' | 'PPA' | 'PROFESOR' | 'NUEVO_USUARIO';
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

  updateUserRole(userId: string, rol: User['rol']): Observable<User> {
    return this.apiService.patch<User>(`/user/${userId}`, { rol });
  }

  updateUser(userId: string, data: Partial<Pick<User, 'userName' | 'apellido'>>): Observable<User> {
    return this.apiService.patch<User>(`/user/${userId}`, data);
  }

  deleteUser(userId: string): Observable<void> {
    return this.apiService.delete<void>(`/user/${userId}`);
  }
}