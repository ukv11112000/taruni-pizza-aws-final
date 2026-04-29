import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/service/authentication.service';
import { LoginService } from 'app/service/login.service';
import { NotificationService } from 'app/service/notification.service';
import { TokenStorageService } from 'app/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;
  roles: any;
  token = '';
  TokenArray = '';

  constructor(
    public service: LoginService,
    public notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private auth: AuthenticationService
  ) { }

  get data() {
    return this.service.form.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.service.form.valid) {

      let username = this.service.form.value.username;
      let password = this.service.form.value.password;

      this.service.login(username, password).subscribe(
        data => {
          this.tokenStorage.saveToken(data.jwt);
          this.tokenStorage.saveUser(data.username);
          this.tokenStorage.saveRole(data.role);

          this.roles = data.role;
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful';

          if (data.role === 'ROLE_ADMIN' || data.role === 'ROLE_SUPERADMIN') {
            this.router.navigate(['/customers']).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/pizza']).then(() => {
              window.location.reload();
            });
          }
        },
        (error: HttpErrorResponse) => {
          this.invalidLogin = true;
          this.loginSuccess = false;
          this.notificationService.error('Invalid username or password');
        }
      );
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
