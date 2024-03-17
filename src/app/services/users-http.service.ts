import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserI} from "../interfaces/user.interface";

@Injectable()
export class UsersHttpService {
  private apiUrl = 'http://localhost:3000/users'; // Base URL to your backend API

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.apiUrl);
  }

  public getUser(id: number): Observable<UserI> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserI>(url);
  }

  public createUser(user: UserI): Observable<UserI> {
    return this.http.post<UserI>(this.apiUrl, user);
  }

  public updateUser(user: UserI): Observable<UserI> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<UserI>(url, user);
  }

  public deleteUser(id: string): Observable<UserI> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<UserI>(url);
  }
}
