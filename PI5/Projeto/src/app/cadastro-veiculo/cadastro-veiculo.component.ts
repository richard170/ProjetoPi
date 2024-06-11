import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.css']
})
export class CadastroVeiculoComponent implements OnInit {

  cliente = {
    nome: '',
    cpf: ''
  };

  veiculo = {
    cpf: '',
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private veiculoService: VeiculoService, private http: HttpClient) {}

  ngOnInit(): void {
    // Carregar os dados do cliente salvos anteriormente
    const clienteSalvo = history.state.cliente;
    if (clienteSalvo) {
      this.cliente.cpf = clienteSalvo.cpf;
      this.cliente.nome = clienteSalvo.nome;
    }
  }

  entrarPrincipal(): void {
    this.router.navigate(['/tela-principal']);
  }

  cadastrarVeiculo() {
    if (this.isFormValid()) {
      this.veiculo.cpf = this.cliente.cpf;
      this.veiculoService.cadastrarVeiculo(this.veiculo)
        .subscribe(
          response => {
            console.log('Veículo cadastrado com sucesso:', response);
            alert('Veículo cadastrado com sucesso.');
            return this.router.navigate(['/tela-principal']);
          },
          error => {
            console.error('Erro ao cadastrar veículo:', error);
          }
        );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  isFormValid(): boolean {
    return this.veiculo.placa !== '' && this.veiculo.marca !== '' && this.veiculo.modelo !== '' && this.veiculo.ano !== '';
  }
}
