import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authservice.service';
import { CommonModule } from '@angular/common'; // Importa o CommonModule

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Inclua CommonModule aqui
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  cadastroForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.cadastroForm.valid) {
      const { name, email, password } = this.cadastroForm.value;
      this.authService.register(name!, email!, password!).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']); // Redireciona para o login
        },
        error: (err) => {
          alert('Erro ao cadastrar: ' + err.error.message);
        },
      });
    }
  }
}
