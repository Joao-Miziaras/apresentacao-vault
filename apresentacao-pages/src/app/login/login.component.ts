import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authservice.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-login',
  standalone: true, // Componente standalone
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule para usar formGroup
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken); // Armazena o token no localStorage
          alert('Login realizado com sucesso!');
          this.router.navigate(['/home']); // Redireciona para a home
        },
        error: (err) => {
          alert('Erro ao logar: ' + err.error.message);
        },
      });
    }
  }
}
