import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {

  cliente = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private clienteService: ClienteService, private http: HttpClient) {}

  validateCpf() {
    if (this.cliente.cpf.length > 11) {
      this.cliente.cpf = this.cliente.cpf.substring(0, 11);
    }
  }

  isFormValid(): boolean {
    return this.cliente.nome !== '' && this.cliente.cpf.length === 11 && this.cliente.telefone !== '' && this.cliente.email !== '';
  }

  entrarPrincipal(): void {
    this.router.navigate(['/tela-principal']);
  }

  entrarCadEndereco(): void {
    if (this.isFormValid()) {
      this.router.navigate(['/cadastro-endereco'], { state: { cliente: this.cliente } });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}
