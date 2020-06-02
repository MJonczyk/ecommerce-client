import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
     username: ['', Validators.required],
     password: ['', Validators.required],
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
    }

    const values = this.loginForm.value;

    this.authService.login(values.username, values.password)
      .subscribe( response => {
        this.authService.saveToken(response.headers.get('authorization'));
        this.router.navigate(['/registerConfirmation']);
      });
  }
}
