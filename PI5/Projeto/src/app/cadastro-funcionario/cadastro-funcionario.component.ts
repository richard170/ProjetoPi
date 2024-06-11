import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../funcionario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css'],
})
export class CadastroFuncionarioComponent {
  funcionario = {
    nome: '',
    senha: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  };

  errorMessage: string = '';

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private http: HttpClient
  ) {}

  cadastrarFuncionario() {
    if (this.isFormValid()) {
      this.funcionarioService.cadastrarFuncionario(this.funcionario).subscribe(
        (response) => {
          console.log('Funcionário cadastrado com sucesso:', response);
          alert('Funcionário cadastrado com sucesso.');
          return this.router.navigate(['/tela-principal']);
        },
        (error) => {
          console.error('Erro ao cadastrar funcionário:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  isFormValid(): boolean {
    return (
      this.funcionario.nome !== '' &&
      this.funcionario.senha !== '' &&
      this.funcionario.cpf !== '' &&
      this.funcionario.telefone !== '' &&
      this.funcionario.email !== '' &&
      this.funcionario.cep !== '' &&
      this.funcionario.logradouro !== '' &&
      this.funcionario.bairro !== '' &&
      this.funcionario.localidade !== '' &&
      this.funcionario.uf !== ''
    );
  }

  entrarPrincipal(): void {
    this.router.navigate(['/tela-principal']);
  }
}
