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

  cadastrarVeiculo() {
    if (this.isFormValid()) {
      this.veiculoService.cadastrarVeiculo(this.veiculo).subscribe(
        (response) => {
          console.log('Veículo cadastrado com sucesso:', response);
          alert('Veículo cadastrado com sucesso.');
          return this.router.navigate(['/tela-principal']);
        },
        (error) => {
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
