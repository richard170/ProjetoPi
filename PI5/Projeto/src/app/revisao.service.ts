import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevisaoService {


  private apiUrl = 'http://localhost:8080/revisoes';
  private apiUrlPlacas = 'http://localhost:8080/revisoes/placas';
  private apiUrlDetalhada = 'http://localhost:8080/revisoes/placa';
  private apiUrlTodasRevisoes = 'http://localhost:8080/revisoes/todas';
  
  constructor(private http: HttpClient) { }

  cadastrarRevisao(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


// Método para obter todas as placas das revisões
placaParaLista(): Observable<string[]> {
  return this.http.get<string[]>(this.apiUrl);
}

  // Método para obter todas as placas das revisões
  getPlacas(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrlPlacas);
  }

  // Método para obter detalhes de uma revisão com base na placa
  getRevisaoDetalhada(placa: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlDetalhada}/${placa}`);
  }

  // Método para obter todas as revisões
  getTodasRevisoes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlTodasRevisoes);
  }

  // Método para atualizar o orçamento de uma revisão
  atualizarOrcamento(id: number, novoOrcamento: string) {
    const url = `http://localhost:8080/revisoes/${id}`;
    return this.http.put(url, { orcamento: novoOrcamento });
  }



}
