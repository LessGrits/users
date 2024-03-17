import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersHttpService} from "../../../../../services/users-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserI} from "../../../../../interfaces/user.interface";
import {UsersFacadeService} from "../../../../../services/users-facade.service";
import {passwordMatchValidator} from "../../../../../validators/password-match.validator";

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  public readonly createUserTitle = 'Create new user';
  public userForm!: FormGroup;
  public formType: 'create' | 'edit' = 'create';
  public userData: UserI | null = null;

  constructor(private formBuilder: FormBuilder,
              private userHttpService: UsersHttpService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private usersFacadeService: UsersFacadeService) {
  }

  public get fullName(): string {
    return this.userData ? `${this.userData.firstName} ${this.userData.lastName}` : '';
  }

  ngOnInit() {
    this.initForm();
  }

  public cancelUserForm() {
    this.router.navigate(['users']);
  }

  public submitForm() {
    if (this.userForm.invalid) return;
    const {repeatPassword, ...user} = this.userForm.value;
    if (this.formType === 'create') {
      this.createUser(user);
    } else {
      this.updateUser({...user, id: this.userData?.id})
    }
  }

  public deleteUser(event: Event) {
    event.preventDefault();
    if (!this.userData) return;
    this.userHttpService.deleteUser(this.userData?.id).subscribe((res) => {
      this.usersFacadeService.removeUser(res.id);
      this.router.navigate(['users']);
    })
  }


  private initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)]],
      repeatPassword: ['', [Validators.required]],
      userType: [null, [Validators.required]]
    }, {validator: passwordMatchValidator});

    this.initFormValues();
  }

  private initFormValues() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.formType = 'create';
        this.userForm.reset();
      } else {
        this.formType = 'edit';
        this.userHttpService.getUser(params['id']).subscribe(user => {
          this.userData = user;
          this.userForm.patchValue(user);
          this.userForm.get('repeatPassword')?.setValue(user.password);
        });
      }
    });
  }

  private updateUser(user: UserI) {
    this.userHttpService.updateUser(user).subscribe(user => {
      this.usersFacadeService.updateUser(user);
    });
  }

  private createUser(user: UserI) {
    this.userHttpService.createUser(user).subscribe(user => {
      this.usersFacadeService.addUser(user);
      this.userForm.reset();
    });
  }
}
