import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersFacadeService} from "../../../../../services/users-facade.service";
import {UsersHttpService} from "../../../../../services/users-http.service";

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {

  public users$ = this.usersFacadeService.users$;
  protected readonly Object = Object;

  constructor(
    private router: Router,
    private usersFacadeService: UsersFacadeService,
    private usersHttpService: UsersHttpService
  ) {
  }

  ngOnInit() {
    this.usersHttpService.getUsers().subscribe(users => {
      this.usersFacadeService.users = users;
      console.log(users)
    })
  }

  public goToCreatingUser() {
    this.router.navigate(['users', 'new']);
  }

  public goToUser(id: string) {
    this.router.navigate(['users', id]);
  }
}
