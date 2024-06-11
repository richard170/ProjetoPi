import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RevisaoService } from '../revisao.service';

@Component({
  selector: 'app-exibir-revisoes',
  templateUrl: './exibir-revisoes.component.html',
  styleUrls: ['./exibir-revisoes.component.css'],
})
export class ExibirRevisoesComponent implements OnInit {
  revisoesDetalhadas: { [placa: string]: any } = {};
  placasRevisoes: any[] = [];
  listaPlacas: string[] = [];
  cardColors: string[] = [
    'light-yellow',
    'light-blue',
    'light-green',
    'light-pink',
    'light-purple',
    'light-purple1',
    'light-purple2',
    'light-purple3',
    'light-purple4',
    'light-purple5',
    'light-purple6',
    'light-purple7',
    'light-purple8',
    'light-purple9',
    'light-purple10',
    'light-purple11',
    'light-purple12',
    'light-purple13',
    'light-purple14',
    'light-purple15',
  ];
  cardColorMap: { [key: string]: string } = {};

  constructor(
    private router: Router,
    private revisaoService: RevisaoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.placaParaLista();
  }

  carregarDetalhesRevisoes() {
    this.listaPlacas.forEach((placa) => {
      this.loadRevisaoDetalhada(placa);
    });
  }

  placaParaLista() {
    this.revisaoService.placaParaLista().subscribe((placas) => {
      this.placasRevisoes = placas;
      console.log('Placas das revisões:', this.placasRevisoes);
      this.listaPlacas = this.placasRevisoes.map((revisao) => revisao.placa);
      console.log('Lista de placas:', this.listaPlacas);

      this.carregarDetalhesRevisoes();
      this.assignRandomColors(); // Atribuir cores aleatórias após carregar as placas
    });
  }

  loadRevisaoDetalhada(placa: string) {
    console.log('Carregando detalhes da revisão para placa:', placa);
    this.revisaoService.getRevisaoDetalhada(placa).subscribe((data) => {
      console.log(
        'Detalhes da revisão carregados para placa',
        placa,
        ':',
        data
      );
      this.revisoesDetalhadas[placa] = data;
    });
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // Enquanto ainda houver elementos para embaralhar...
    while (0 !== currentIndex) {
      // Pegue um elemento restante...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // E troque-o com o elemento atual.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  assignRandomColors(): void {
    this.cardColors = this.shuffle(this.cardColors); // Embaralha as cores
    this.listaPlacas.forEach((placa, index) => {
      this.cardColorMap[placa] =
        this.cardColors[index % this.cardColors.length];
    });
  }

  entrarPrincipal() {
    this.router.navigate(['/tela-principal']);
  }

  salvarOrcamento(placa: string, novoOrcamento: string) {
    const revisao = this.placasRevisoes.find((rev) => rev.placa === placa);
    if (revisao) {
      const telefoneCliente = this.revisoesDetalhadas[placa]?.telefoneCliente;
      const id = revisao.id;
      const dadosRevisao = {
        id: id,
        placa: placa,
        tipoRevisao: this.revisoesDetalhadas[placa]?.tipoRevisao,
        detalhesRevisao: this.revisoesDetalhadas[placa]?.detalhesRevisao,
        orcamento: novoOrcamento,
      };
      this.atualizarOrcamento(id, dadosRevisao).subscribe(
        (response) => {
          console.log('Orçamento atualizado com sucesso:', response);
          this.enviarMensagem(
            telefoneCliente,
            `📢 *AUTO SOS NOTIFICA*\\nAtendimento para o veiculo de placa *${placa}*.\\nInformativos: *${novoOrcamento}*`
          );
        },
        (error) => {
          console.error('Erro ao atualizar orçamento:', error);
        }
      );
    } else {
      console.error('Placa não encontrada:', placa);
    }
  }

  atualizarOrcamento(id: number, dadosRevisao: any) {
    const url = `http://localhost:8080/revisoes/${id}`;
    return this.http.put(url, dadosRevisao);
  }

  obterTelefoneCliente(placa: string): string {
    return this.revisoesDetalhadas[placa]?.telefoneCliente || 'Não encontrado';
  }

  enviarMensagem(telefoneCliente: string, mensagem: string) {
    if (telefoneCliente !== 'Não encontrado') {
      const mensagemData = {
        numero: telefoneCliente,
        mensagem: mensagem,
      };
      const url = 'http://localhost:8081/mensagem/enviar-mensagem';
      this.http.post(url, mensagemData).subscribe(
        (response) => {
          console.log('Mensagem enviada com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao enviar mensagem:', error);
        }
      );
    } else {
      console.error(
        'Número de telefone do cliente não encontrado:',
        telefoneCliente
      );
    }
  }

  enviarStatus(placa: string, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;
    const telefoneCliente = this.obterTelefoneCliente(placa);

    if (telefoneCliente !== 'Não encontrado') {
      const mensagem = `📢 *AUTO SOS NOTIFICA*\\nAtendimento para o veiculo de placa *${placa}*.\\nFoi atualizado para : ${status}`;
      this.enviarMensagem(telefoneCliente, mensagem);

      switch (status) {
        case 'Aguardando':
          selectElement.style.backgroundColor = 'rgb(255, 230, 0)';
          break;
        case 'Andamento':
          selectElement.style.backgroundColor = 'rgb(255, 165, 0)';
          break;
        case 'Concluido':
          selectElement.style.backgroundColor = 'rgb(0, 124, 173)';
          break;
        default:
          selectElement.style.backgroundColor = '';
          break;
      }
    } else {
      console.error(
        'Número de telefone do cliente não encontrado para a placa:',
        placa
      );
    }
  }

  updateOrcamento(newOrcamento: string, placa: string) {
    if (!this.revisoesDetalhadas[placa]) {
      this.revisoesDetalhadas[placa] = {};
    }
    this.revisoesDetalhadas[placa].orcamento = newOrcamento;
  }

  concluirRevisao(placa: string) {
    const revisao = this.placasRevisoes.find((rev) => rev.placa === placa);
    if (revisao) {
      const id = revisao.id;
      const url = `http://localhost:8080/revisoes/${id}`;
      this.http.delete(url).subscribe(
        () => {
          console.log('Revisão concluída com sucesso para a placa:', placa);
          // Navegar para uma rota diferente antes de voltar para a página de exibição de revisões
          this.router.navigate(['/dummy']).then(() => {
            this.router.navigate(['/exibir-revisoes']);
          });
        },
        (error) => {
          console.error('Erro ao concluir revisão:', error);
        }
      );
    } else {
      console.error('Placa não encontrada:', placa);
    }
  }

  entrarExibirRevisoes(): void {
    this.router.navigate(['/exibir-revisoes']);
  }
}
