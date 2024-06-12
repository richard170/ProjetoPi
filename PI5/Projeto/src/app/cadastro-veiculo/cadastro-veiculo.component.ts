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

  buscarVeiculo(): void {
    if (this.veiculo.placa) {
      const apiUrl = `https://wdapi2.com.br/consulta/${this.veiculo.placa}/9843281519f0580b62427c8f0bb09937`;
      this.http.get<any>(apiUrl).subscribe(
        response => {
          if (response) {
            this.veiculo.marca = response.marca || '';
            this.veiculo.modelo = response.modelo || '';
            this.veiculo.ano = response.ano || '';
          } else {
            this.errorMessage = 'Veículo não encontrado.';
          }
        },
        error => {
          console.error('Erro ao buscar veículo:', error);
          this.errorMessage = 'Erro ao buscar veículo. Tente novamente mais tarde.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, insira a placa do veículo.';
    }
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
            this.errorMessage = 'Erro ao cadastrar veículo. Tente novamente mais tarde.';
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
