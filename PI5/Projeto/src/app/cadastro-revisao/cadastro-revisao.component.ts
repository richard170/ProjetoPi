import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RevisaoService } from '../revisao.service';

@Component({
  selector: 'app-cadastro-revisao',
  templateUrl: './cadastro-revisao.component.html',
  styleUrls: ['./cadastro-revisao.component.css']
})
export class CadastroRevisaoComponent {
  revisao = {
    placa: '',
    tipoRevisao: '',
    detalhesRevisao: '',
  };

  constructor(
    private router: Router,
    private revisaoService: RevisaoService,
    private http: HttpClient
  ) {}

  entrarPrincipal(): void {
    this.router.navigate(['/tela-principal']);
  }  

  cadastrarRevisao() {
    this.revisaoService.cadastrarRevisao(this.revisao).subscribe(
      (response: any) => {
        console.log('Revisão cadastrada com sucesso:', response);
        alert('Revisão cadastrada com sucesso.');

        // Enviar mensagem ao cliente após cadastro da revisão
        this.enviarMensagemAposCadastro(this.revisao.placa);
      },
      (error: any) => {
        console.error('Erro ao cadastrar revisão:', error);
      }
    );
  } 

  enviarMensagemAposCadastro(placa: string) {
    this.revisaoService.getRevisaoDetalhada(placa).subscribe(
      (revisaoDetalhada: any) => {
        const telefoneCliente = revisaoDetalhada?.telefoneCliente;
        if (telefoneCliente) {
          const mensagem = `🚗 AUTO SOS NOTIFICA 🚙 - Sua revisão foi iniciada com sucesso para o veiculo de placa ${placa}. - Atualizaremos o Status de andamento por aqui 🚀 `;
          this.enviarMensagem(telefoneCliente, mensagem);
        } else {
          console.error('Número de telefone do cliente não encontrado para a placa:', placa);
        }
      },
      (error: any) => {
        console.error('Erro ao obter detalhes da revisão para enviar mensagem:', error);
      }
    );
  }

  enviarMensagem(telefoneCliente: string, mensagem: string) {
    const mensagemData = {
      numero: telefoneCliente,
      mensagem: mensagem
    };
    const url = 'http://localhost:8081/mensagem/enviar-mensagem';
    this.http.post(url, mensagemData).subscribe(
      response => {
        console.log('Mensagem enviada com sucesso:', response);
      },
      error => {
        console.error('Erro ao enviar mensagem:', error);
      }
    );
  }
}
