import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserI} from "../interfaces/user.interface";

@Injectable()
export class UsersFacadeService {

  private readonly _users = new BehaviorSubject<UserI[]>([]);
  public readonly users$ = this._users.asObservable();

  constructor() {
  }

  public get users(): UserI[] {
    return this._users.getValue();
  }

  public set users(val: UserI[]) {
    this._users.next(val);
  }

  public addUser(user: UserI): void {
    this.users = [
      ...this.users,
      user
    ];
  }

  public updateUser(user: UserI): void {
    this.users = this.users.map(u => u.id === user.id ? user : u);
  }

  public removeUser(id: string): void {
    this.users = this.users.filter(todo => todo.id !== id);
  }

}
