import { LoginService } from '@admin/shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from '@core/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.sweetAlertService.fireToast({
        title: 'Ingrese los datos correctamente',
        icon: 'error',
      });
      return;
    }
    localStorage.setItem('token', 'tokenProvisional');
    this.router.navigate(['admin/']);
    // this.loginService.login(this.loginForm.value).subscribe(
    //   (succes) => {
    //     localStorage.setItem('token', succes.accessToken);
    //     this.router.navigate(['admin/']);
    //   },
    //   (error) => {
    //     this.sweetAlertService.fireToast({
    //       title: 'Credenciales Incorrectas',
    //       icon: 'error',
    //     });
    //     this.loginForm.get('password')!.reset();
    //   }
    // );
  }
}
