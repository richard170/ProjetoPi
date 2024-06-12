import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VeiculoService } from '../veiculo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-veiculo2',
  templateUrl: './cadastro-veiculo2.component.html',
  styleUrls: ['./cadastro-veiculo2.component.css'],
})
export class CadastroVeiculo2Component {
  veiculo = {
    cpf: '',
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
  };

  errorMessage: string = '';

  constructor(
    private router: Router,
    private veiculoService: VeiculoService,
    private http: HttpClient
  ) {}

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
      this.veiculoService.cadastrarVeiculo(this.veiculo).subscribe(
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
    return (
      this.veiculo.cpf !== '' &&
      this.veiculo.placa !== '' &&
      this.veiculo.marca !== '' &&
      this.veiculo.modelo !== '' &&
      this.veiculo.ano !== ''
    );
  }
}
